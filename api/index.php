<?php
/**
 * ActionSteps Counseling — Public Articles API
 *
 * Public read-only endpoints used by the React frontend.
 *   GET /api/index.php/articles                 -> list published articles
 *   GET /api/index.php/articles/{id|slug}       -> single published article
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

// Normalize a leading index.php in the path.
if (strpos($path, 'index.php/') === 0) {
    $path = substr($path, strlen('index.php/'));
}

$segments = $path !== '' ? explode('/', $path) : [];

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'GET') {
    send_error('Method not allowed.', 405);
}

// URL conventions (mirroring admin.php):
//   /api/index.php/articles           -> list published articles
//   /api/index.php/articles/{slug}    -> single published article
//   /api/index.php                    -> list published articles (shortcut)
$listPath = count($segments) === 0 || (count($segments) === 1 && $segments[0] === 'articles');

if ($listPath) {
    // List published articles, newest first. Optionally filter by category:
    //   GET /api/index.php/articles?category=Article
    //   GET /api/index.php/articles?category=Press
    $category = trim((string)($_GET['category'] ?? ''));
    if ($category !== '') {
        $stmt = $conn->prepare(
            "SELECT id, title, slug, excerpt, cover_image, category, external_url, author, featured,
                    DATE_FORMAT(created_at, '%M %d, %Y') AS date
             FROM articles
             WHERE status = 'published' AND category = ?
             ORDER BY featured DESC, created_at DESC"
        );
        $stmt->bind_param('s', $category);
    } else {
        $stmt = $conn->prepare(
            "SELECT id, title, slug, excerpt, cover_image, category, external_url, author, featured,
                    DATE_FORMAT(created_at, '%M %d, %Y') AS date
             FROM articles
             WHERE status = 'published'
             ORDER BY featured DESC, created_at DESC"
        );
    }
    $stmt->execute();
    $result = $stmt->get_result();
    $articles = [];
    while ($row = $result->fetch_assoc()) {
        $articles[] = $row;
    }
    send_json(['articles' => $articles]);
}

if (count($segments) === 2 && $segments[0] === 'articles') {
    // Single article by id or slug.
    $key = $segments[1];
    $cols = "SELECT id, title, slug, excerpt, body, cover_image, category, external_url, author, featured,
                    DATE_FORMAT(created_at, '%M %d, %Y') AS date
             FROM articles";
    if (is_numeric($key)) {
        $stmt = $conn->prepare(
            $cols . " WHERE id = ? AND status = 'published'"
        );
        $stmt->bind_param('i', $key);
    } else {
        $stmt = $conn->prepare(
            $cols . " WHERE slug = ? AND status = 'published'"
        );
        $stmt->bind_param('s', $key);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        send_json($row);
    }
    send_error('Article not found.', 404);
}

send_error('Not found.', 404);
