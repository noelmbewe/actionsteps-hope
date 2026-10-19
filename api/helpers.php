<?php
/**
 * Shared helpers for the ActionSteps API.
 */

function load_config(): array {
    $configFile = __DIR__ . '/config.php';
    if (!file_exists($configFile)) {
        http_response_code(500);
        echo json_encode(['error' => 'config.php not found. Copy config.example.php to config.php and fill in your database credentials.']);
        exit;
    }
    return require $configFile;
}

function get_connection(array $config): mysqli {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    try {
        $conn = new mysqli(
            $config['db']['host'],
            $config['db']['user'],
            $config['db']['pass'],
            $config['db']['name']
        );
        $conn->set_charset('utf8mb4');
        return $conn;
    } catch (mysqli_sql_exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed.', 'detail' => $e->getMessage()]);
        exit;
    }
}

/**
 * Idempotent auto-migration. Adds columns introduced after the original
 * release so freshly uploaded code works without a manual database step.
 * Runs a single cheap information_schema lookup per request.
 */
function ensure_schema(mysqli $conn, array $config): void {
    $db = $conn->real_escape_string($config['db']['name']);
    $columns = [
        'external_url' => 'VARCHAR(500) DEFAULT NULL',
    ];
    foreach ($columns as $column => $definition) {
        $result = $conn->query(
            "SELECT COUNT(*) AS c FROM information_schema.columns
             WHERE table_schema = '$db' AND table_name = 'articles' AND column_name = '$column'"
        );
        if (!$result) {
            continue; // Let the caller's error handling surface real issues.
        }
        if ((int)$result->fetch_assoc()['c'] === 0) {
            $conn->query("ALTER TABLE articles ADD COLUMN `$column` $definition AFTER `category`");
        }
    }
}

/** Convert any uncaught PHP exception into a readable JSON error. */
function register_error_handler(): void {
    set_exception_handler(function (Throwable $e): void {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Server error.', 'detail' => $e->getMessage()]);
        exit;
    });
}

function send_json($data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function send_error(string $message, int $status = 400): void {
    send_json(['error' => $message], $status);
}

function json_body(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        send_error('Invalid JSON body.');
    }
    return $data;
}

function slugify(string $text): string {
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    $text = trim($text, '-');
    return $text !== '' ? $text : 'article-' . time();
}

/** Absolute origin (scheme://host) of the current request. */
function request_origin(): string {
    $https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    $scheme = $https ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? 'localhost';
    return $scheme . '://' . $host;
}

function get_token_from_header(): ?string {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? '';
    if (preg_match('/Bearer\s+(.+)/i', $auth, $m)) {
        return trim($m[1]);
    }
    return null;
}

function base64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode(string $data): string {
    return base64_decode(strtr($data, '-_', '+/'));
}

function make_token(array $config, string $username): string {
    $header = base64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64url_encode(json_encode([
        'sub' => $username,
        'iat' => time(),
        'exp' => time() + (60 * 60 * 12), // 12 hours
    ]));
    $signature = base64url_encode(hash_hmac('sha256', "$header.$payload", $config['jwt_secret'], true));
    return "$header.$payload.$signature";
}

function verify_token(array $config): string {
    $token = get_token_from_header();
    if (!$token) {
        send_error('Authentication required.', 401);
    }
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        send_error('Invalid token.', 401);
    }
    [$header, $payload, $signature] = $parts;
    $expected = base64url_encode(hash_hmac('sha256', "$header.$payload", $config['jwt_secret'], true));
    if (!hash_equals($expected, $signature)) {
        send_error('Invalid token signature.', 401);
    }
    $claims = json_decode(base64url_decode($payload), true);
    if (!is_array($claims) || ($claims['exp'] ?? 0) < time()) {
        send_error('Token expired. Please sign in again.', 401);
    }
    return (string)($claims['sub'] ?? '');
}
