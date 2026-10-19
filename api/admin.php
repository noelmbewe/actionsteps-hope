<?php
/**
 * ActionSteps Counseling — Admin API
 *
 * Protected CRUD endpoints used by the React admin section.
 *   POST   /api/admin.php/login                 -> authenticate, returns JWT
 *   GET    /api/admin.php/me                    -> current admin user
 *   PUT    /api/admin.php/me                    -> update own username / email / password
 *   GET    /api/admin.php/users                 -> list all admin users
 *   POST   /api/admin.php/users                 -> create a new admin user
 *   PUT    /api/admin.php/users/{id}            -> update admin user
 *   DELETE /api/admin.php/users/{id}            -> delete admin user
 *   GET    /api/admin.php/articles              -> list ALL articles (incl. drafts)
 *   GET    /api/admin.php/articles/{id}         -> single article
 *   POST   /api/admin.php/articles              -> create article
 *   PUT    /api/admin.php/articles/{id}         -> update article
 *   DELETE /api/admin.php/articles/{id}         -> delete article
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/helpers.php';

register_error_handler();

$config = load_config();
$conn = get_connection($config);
ensure_schema($conn, $config);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$base = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');
$path = trim(substr($uri, strlen($base)), '/');

// Normalize a leading admin.php in the path.
if (strpos($path, 'admin.php/') === 0) {
    $path = substr($path, strlen('admin.php/'));
}

$segments = $path !== '' ? explode('/', $path) : [];

$method = $_SERVER['REQUEST_METHOD'];

// ---- Login (public) ----
if ($method === 'POST' && count($segments) === 1 && $segments[0] === 'login') {
    $body = json_body();
    $username = trim((string)($body['username'] ?? ''));
    $password = (string)($body['password'] ?? '');

    if ($username !== '' && $password !== '') {
        $stmt = $conn->prepare(
            "SELECT id, username, email, password_hash, is_active FROM admin_users WHERE username = ?"
        );
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($user = $result->fetch_assoc()) {
            if ((int)$user['is_active'] === 1 && password_verify($password, $user['password_hash'])) {
                send_json([
                    'token' => make_token($config, $user['id']),
                    'user' => [
                        'id' => (int)$user['id'],
                        'username' => $user['username'],
                        'email' => $user['email'],
                    ],
                ], 200);
            }
        }
    }
    send_error('Invalid credentials.', 401);
}

// ---- Everything below requires authentication ----
$currentUserId = (int)verify_token($config);

if ($currentUserId < 1) {
    send_error('Invalid token subject.', 401);
}

// Fetch the current user's row so we can check active status on each request.
$meStmt = $conn->prepare("SELECT id, username, email, is_active FROM admin_users WHERE id = ?");
$meStmt->bind_param('i', $currentUserId);
$meStmt->execute();
$me = $meStmt->get_result()->fetch_assoc();
if (!$me || (int)$me['is_active'] !== 1) {
    send_error('Account is inactive or no longer exists.', 401);
}

// ---- GET /me ----
if ($method === 'GET' && count($segments) === 1 && $segments[0] === 'me') {
    send_json([
        'id' => (int)$me['id'],
        'username' => $me['username'],
        'email' => $me['email'],
    ]);
}

// ---- PUT /me (change own username / email / password) ----
if ($method === 'PUT' && count($segments) === 1 && $segments[0] === 'me') {
    $body = json_body();

    $newUsername = isset($body['username']) ? trim((string)$body['username']) : $me['username'];
    $newEmail = isset($body['email']) ? trim((string)$body['email']) : ($me['email'] ?? '');
    if ($newEmail === '') {
        $newEmail = null;
    }

    if ($newUsername === '') {
        send_error('Username cannot be empty.', 422);
    }

    // If the user wants to change their password, require the current one.
    $newPassword = (string)($body['new_password'] ?? '');
    if ($newPassword !== '') {
        $current = (string)($body['current_password'] ?? '');
        $pwStmt = $conn->prepare("SELECT password_hash FROM admin_users WHERE id = ?");
        $pwStmt->bind_param('i', $currentUserId);
        $pwStmt->execute();
        $pwRow = $pwStmt->get_result()->fetch_assoc();
        if (!$pwRow || !password_verify($current, $pwRow['password_hash'])) {
            send_error('Current password is incorrect.', 422);
        }
        if (strlen($newPassword) < 6) {
            send_error('New password must be at least 6 characters.', 422);
        }
    }

    // Username uniqueness.
    $dupe = $conn->prepare("SELECT id FROM admin_users WHERE username = ? AND id <> ?");
    $dupe->bind_param('si', $newUsername, $currentUserId);
    $dupe->execute();
    if ($dupe->get_result()->num_rows > 0) {
        send_error('That username is already taken.', 422);
    }

    if ($newPassword !== '') {
        $hash = password_hash($newPassword, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE admin_users SET username = ?, email = ?, password_hash = ? WHERE id = ?");
        $stmt->bind_param('sssi', $newUsername, $newEmail, $hash, $currentUserId);
    } else {
        $stmt = $conn->prepare("UPDATE admin_users SET username = ?, email = ? WHERE id = ?");
        $stmt->bind_param('ssi', $newUsername, $newEmail, $currentUserId);
    }
    $stmt->execute();

    send_json([
        'id' => $currentUserId,
        'username' => $newUsername,
        'email' => $newEmail,
    ]);
}

// ---- Upload image (multipart/form-data), authenticated ----
//   POST /api/admin.php/upload  field: file  (jpeg/png/webp/gif, max 8MB)
if ($method === 'POST' && count($segments) === 1 && $segments[0] === 'upload') {
    if (empty($_FILES['file'])) {
        send_error('No file uploaded. Use a form field named "file".', 422);
    }
    $file = $_FILES['file'];
    if ($file['error'] !== UPLOAD_ERR_OK) {
        send_error('Upload failed with error code ' . $file['error'], 422);
    }
    if ($file['size'] > 8 * 1024 * 1024) {
        send_error('File must be 8MB or smaller.', 422);
    }

    $allowed = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif',
    ];
    $mime = mime_content_type($file['tmp_name']);
    if (!isset($allowed[$mime])) {
        send_error('Only JPG, PNG, WEBP and GIF images are allowed.', 422);
    }

    $ext = $allowed[$mime];
    $name = bin2hex(random_bytes(12)) . '.' . $ext;

    // Uploads live next to the api folder: /uploads/xxx.jpg
    $uploadsDir = dirname(__DIR__) . '/uploads';
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0755, true);
    }
    // Self-protect the uploads folder: block direct PHP/script execution.
    $ht = $uploadsDir . '/.htaccess';
    if (!file_exists($ht)) {
        @file_put_contents(
            $ht,
            "# Deny script execution inside uploads\n<FilesMatch \"\\.(php|phtml|php5|phar)$\">\n  Require all denied\n</FilesMatch>\n"
        );
    }

    if (!move_uploaded_file($file['tmp_name'], $uploadsDir . '/' . $name)) {
        send_error('Could not save the uploaded file.', 500);
    }

    // Absolute URL so images work from the frontend domain (the API may be on
    // a different subdomain/origin than the site itself).
    send_json(['url' => request_origin() . '/uploads/' . $name], 201);
}

// ---- /users endpoints ----
if (count($segments) >= 1 && $segments[0] === 'users') {
    handle_users($conn, $config, $method, $segments, $currentUserId);
}

// ---- /articles endpoints ----
if (count($segments) >= 1 && $segments[0] === 'articles') {
    handle_articles($conn, $method, $segments);
}

send_error('Not found.', 404);

/**
 * CRUD for admin users.
 */
function handle_users(mysqli $conn, array $config, string $method, array $segments, int $currentUserId): void {
    if (count($segments) === 1) {
        if ($method === 'GET') {
            $result = $conn->query(
                "SELECT id, username, email, is_active, DATE_FORMAT(created_at, '%M %d, %Y') AS created
                 FROM admin_users ORDER BY id"
            );
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $row['id'] = (int)$row['id'];
                $row['is_active'] = (int)$row['is_active'];
                $users[] = $row;
            }
            send_json(['users' => $users]);
        }

        if ($method === 'POST') {
            $body = json_body();
            create_admin_user($conn, $body);
            send_json(['created' => true], 201);
        }

        send_error('Method not allowed.', 405);
    }

    if (count($segments) === 2) {
        $targetId = (int)$segments[1];
        if ($targetId < 1) {
            send_error('Invalid user id.', 400);
        }

        if ($method === 'GET') {
            $stmt = $conn->prepare("SELECT id, username, email, is_active FROM admin_users WHERE id = ?");
            $stmt->bind_param('i', $targetId);
            $stmt->execute();
            if ($row = $stmt->get_result()->fetch_assoc()) {
                $row['id'] = (int)$row['id'];
                $row['is_active'] = (int)$row['is_active'];
                send_json($row);
            }
            send_error('User not found.', 404);
        }

        if ($method === 'PUT') {
            $body = json_body();
            update_admin_user($conn, $body, $targetId, $currentUserId);
            send_json(['updated' => true]);
        }

        if ($method === 'DELETE') {
            delete_admin_user($conn, $targetId, $currentUserId);
            send_json(['deleted' => true]);
        }

        send_error('Method not allowed.', 405);
    }

    send_error('Not found.', 404);
}

function create_admin_user(mysqli $conn, array $body): void {
    $username = trim((string)($body['username'] ?? ''));
    $password = (string)($body['password'] ?? '');
    $email = trim((string)($body['email'] ?? ''));

    if ($username === '' || $password === '') {
        send_error('Username and password are required.', 422);
    }
    if (strlen($password) < 6) {
        send_error('Password must be at least 6 characters.', 422);
    }
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        send_error('Invalid email address.', 422);
    }

    $stmt = $conn->prepare("SELECT id FROM admin_users WHERE username = ?");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        send_error('That username is already taken.', 422);
    }

    $hash = password_hash($password, PASSWORD_BCRYPT);
    $insert = $conn->prepare("INSERT INTO admin_users (username, email, password_hash) VALUES (?, ?, ?)");
    $insert->bind_param('sss', $username, $email !== '' ? $email : null, $hash);
    $insert->execute();
}

function update_admin_user(mysqli $conn, array $body, int $targetId, int $currentUserId): void {
    $stmt = $conn->prepare("SELECT id FROM admin_users WHERE id = ?");
    $stmt->bind_param('i', $targetId);
    $stmt->execute();
    if ($stmt->get_result()->num_rows === 0) {
        send_error('User not found.', 404);
    }

    $username = trim((string)($body['username'] ?? ''));
    if ($username === '') {
        send_error('Username cannot be empty.', 422);
    }

    $dupe = $conn->prepare("SELECT id FROM admin_users WHERE username = ? AND id <> ?");
    $dupe->bind_param('si', $username, $targetId);
    $dupe->execute();
    if ($dupe->get_result()->num_rows > 0) {
        send_error('That username is already taken.', 422);
    }

    $email = isset($body['email']) ? trim((string)$body['email']) : null;
    if ($email === '') {
        $email = null;
    }

    $isActive = isset($body['is_active']) ? (int)(bool)$body['is_active'] : null;

    // Do not allow deactivating yourself.
    if ($isActive === 0 && $targetId === $currentUserId) {
        send_error('You cannot deactivate your own account.', 422);
    }

    // If deactivating or deleting the last active admin is a problem, guard here:
    if ($isActive === 0) {
        $cnt = $conn->query("SELECT COUNT(*) AS c FROM admin_users WHERE is_active = 1")->fetch_assoc()['c'];
        if ((int)$cnt <= 1) {
            send_error('Cannot deactivate the last active admin.', 422);
        }
    }

    $password = (string)($body['password'] ?? '');
    if ($password !== '') {
        if (strlen($password) < 6) {
            send_error('Password must be at least 6 characters.', 422);
        }
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $sql = "UPDATE admin_users SET username = ?, email = ?, password_hash = ?, is_active = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $active = $isActive ?? 1;
        $stmt->bind_param('sssii', $username, $email, $hash, $active, $targetId);
    } else {
        $sql = "UPDATE admin_users SET username = ?, email = ?, is_active = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $active = $isActive ?? 1;
        $stmt->bind_param('ssii', $username, $email, $active, $targetId);
    }
    $stmt->execute();
}

function delete_admin_user(mysqli $conn, int $targetId, int $currentUserId): void {
    if ($targetId === $currentUserId) {
        send_error('You cannot delete your own account.', 422);
    }

    $cnt = $conn->query("SELECT COUNT(*) AS c FROM admin_users WHERE is_active = 1")->fetch_assoc()['c'];
    if ((int)$cnt <= 1) {
        send_error('Cannot delete the last active admin.', 422);
    }

    $stmt = $conn->prepare("DELETE FROM admin_users WHERE id = ?");
    $stmt->bind_param('i', $targetId);
    $stmt->execute();
    if ($stmt->affected_rows === 0) {
        send_error('User not found.', 404);
    }
}

/**
 * CRUD for articles.
 */
function handle_articles(mysqli $conn, string $method, array $segments): void {
    if (count($segments) === 1) {
        if ($method === 'GET') {
            $result = $conn->query(
                "SELECT id, title, slug, excerpt, cover_image, category, external_url, author, status, featured,
                        DATE_FORMAT(created_at, '%M %d, %Y') AS date
                 FROM articles
                 ORDER BY created_at DESC"
            );
            $articles = [];
            while ($row = $result->fetch_assoc()) {
                $articles[] = $row;
            }
            send_json(['articles' => $articles]);
        }

        if ($method === 'POST') {
            $body = json_body();
            $article = validate_article($conn, $body, null);
            $stmt = $conn->prepare(
                "INSERT INTO articles (title, slug, excerpt, body, cover_image, category, external_url, author, status, featured)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            );
            $stmt->bind_param(
                'sssssssssi',
                $article['title'],
                $article['slug'],
                $article['excerpt'],
                $article['body'],
                $article['cover_image'],
                $article['category'],
                $article['external_url'],
                $article['author'],
                $article['status'],
                $article['featured']
            );
            $stmt->execute();
            send_json(['id' => $conn->insert_id], 201);
        }

        send_error('Method not allowed.', 405);
    }

    if (count($segments) === 2) {
        $id = (int)$segments[1];
        if ($id < 1) {
            send_error('Invalid article id.', 400);
        }

        if ($method === 'GET') {
            $stmt = $conn->prepare(
                "SELECT id, title, slug, excerpt, body, cover_image, category, external_url, author, status, featured,
                        DATE_FORMAT(created_at, '%Y-%m-%d') AS created_raw
                 FROM articles WHERE id = ?"
            );
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($row = $result->fetch_assoc()) {
                send_json($row);
            }
            send_error('Article not found.', 404);
        }

        if ($method === 'PUT') {
            $body = json_body();

            // If no slug was provided (admin no longer edits slugs), keep the
            // article's existing slug so the URL stays stable across edits.
            $incomingSlug = trim((string)($body['slug'] ?? ''));
            if ($incomingSlug === '') {
                $fetch = $conn->prepare("SELECT slug FROM articles WHERE id = ?");
                $fetch->bind_param('i', $id);
                $fetch->execute();
                $existing = $fetch->get_result()->fetch_assoc();
                $body['slug'] = $existing ? $existing['slug'] : null;
            }

            $article = validate_article($conn, $body, $id);
            $stmt = $conn->prepare(
                "UPDATE articles SET title = ?, slug = ?, excerpt = ?, body = ?, cover_image = ?, category = ?, external_url = ?, author = ?, status = ?, featured = ?
                 WHERE id = ?"
            );
            $stmt->bind_param(
                'sssssssssii',
                $article['title'],
                $article['slug'],
                $article['excerpt'],
                $article['body'],
                $article['cover_image'],
                $article['category'],
                $article['external_url'],
                $article['author'],
                $article['status'],
                $article['featured'],
                $id
            );
            $stmt->execute();
            send_json(['id' => $id]);
        }

        if ($method === 'DELETE') {
            $stmt = $conn->prepare("DELETE FROM articles WHERE id = ?");
            $stmt->bind_param('i', $id);
            $stmt->execute();
            send_json(['deleted' => true]);
        }

        send_error('Method not allowed.', 405);
    }

    send_error('Not found.', 404);
}

function validate_article(mysqli $conn, array $body, ?int $ignoreId): array {
    $title = trim((string)($body['title'] ?? ''));
    $excerpt = trim((string)($body['excerpt'] ?? ''));
    $bodyText = (string)($body['body'] ?? '');
    $external_url = trim((string)($body['external_url'] ?? ''));

    if ($title === '') {
        send_error('Title is required.', 422);
    }
    // Articles require written content. Press items with a source link don't.
    if ($bodyText === '' && $external_url === '') {
        send_error('Either the article body or a source link is required.', 422);
    }
    if ($external_url !== '' && !filter_var($external_url, FILTER_VALIDATE_URL)) {
        send_error('The source link must be a valid URL (include https://).', 422);
    }

    $slug = trim((string)($body['slug'] ?? ''));
    if ($slug === '') {
        $slug = slugify($title);
    } else {
        $slug = slugify($slug);
    }

    // Ensure slug uniqueness.
    $stmt = $conn->prepare("SELECT id FROM articles WHERE slug = ?" . ($ignoreId ? " AND id <> ?" : ""));
    if ($ignoreId) {
        $stmt->bind_param('si', $slug, $ignoreId);
    } else {
        $stmt->bind_param('s', $slug);
    }
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        $slug = $slug . '-' . time();
    }

    $cover_image = trim((string)($body['cover_image'] ?? ''));

    $category = trim((string)($body['category'] ?? 'Article'));
    if (!in_array($category, ['Article', 'Press'], true)) {
        $category = 'Article';
    }

    return [
        'title' => $title,
        'slug' => $slug,
        'excerpt' => $excerpt,
        'body' => $bodyText,
        'cover_image' => $cover_image,
        'external_url' => $external_url !== '' ? $external_url : null,
        'category' => $category,
        'author' => trim((string)($body['author'] ?? 'ActionSteps Counseling')) ?: 'ActionSteps Counseling',
        'status' => ($body['status'] ?? 'draft') === 'published' ? 'published' : 'draft',
        'featured' => !empty($body['featured']) ? 1 : 0,
    ];
}