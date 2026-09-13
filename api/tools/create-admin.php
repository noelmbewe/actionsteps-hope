<?php
/**
 * Admin user creation / password reset tool.
 *
 * Run from your server's project root (the folder that contains the api/ dir):
 *
 *   Create a new admin:
 *     php api/tools/create-admin.php create admin YourPassword [you@example.com]
 *
 *   Reset an existing admin's password:
 *     php api/tools/create-admin.php reset admin NewPassword
 *
 *   List all admin users:
 *     php api/tools/create-admin.php list
 *
 * This is only for initial setup / recovery. Once running, admins can manage
 * accounts from the Admin portal (Users page).
 *
 * IMPORTANT: The admin who runs this script is identified as a CLI user, NOT a
 * web request, so there is no authentication — protect the server's shell/SSH.
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    echo "This script can only be run from the command line.\n";
    exit;
}

$configFile = __DIR__ . '/../config.php';
if (!file_exists($configFile)) {
    fwrite(STDERR, "config.php not found. Copy config.example.php to config.php first.\n");
    exit(1);
}
$config = require $configFile;

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli(
    $config['db']['host'],
    $config['db']['user'],
    $config['db']['pass'],
    $config['db']['name']
);
$conn->set_charset('utf8mb4');

$action = $argv[1] ?? '';

switch ($action) {
    case 'create':
        $username = trim($argv[2] ?? '');
        $password = $argv[3] ?? '';
        $email = trim($argv[4] ?? '');
        if ($username === '' || $password === '') {
            fwrite(STDERR, "Usage: php api/tools/create-admin.php create <username> <password> [email]\n");
            exit(1);
        }
        if (strlen($password) < 6) {
            fwrite(STDERR, "Password must be at least 6 characters.\n");
            exit(1);
        }
        $exists = $conn->prepare("SELECT id FROM admin_users WHERE username = ?");
        $exists->bind_param('s', $username);
        $exists->execute();
        if ($exists->get_result()->num_rows > 0) {
            fwrite(STDERR, "Admin '$username' already exists. Use 'reset' to change its password.\n");
            exit(1);
        }
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO admin_users (username, email, password_hash) VALUES (?, ?, ?)");
        $stmt->bind_param('sss', $username, $email, $hash);
        $stmt->execute();
        echo "Admin '$username' created successfully.\n";
        echo "Sign in at: /admin\n";
        echo "It is strongly recommended to change the password after first login.\n";
        break;

    case 'reset':
        $username = trim($argv[2] ?? '');
        $password = $argv[3] ?? '';
        if ($username === '' || $password === '') {
            fwrite(STDERR, "Usage: php api/tools/create-admin.php reset <username> <password>\n");
            exit(1);
        }
        if (strlen($password) < 6) {
            fwrite(STDERR, "Password must be at least 6 characters.\n");
            exit(1);
        }
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE admin_users SET password_hash = ? WHERE username = ?");
        $stmt->bind_param('ss', $hash, $username);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            echo "Password for '$username' reset successfully.\n";
        } else {
            fwrite(STDERR, "No admin found with username '$username'.\n");
            exit(1);
        }
        break;

    case 'list':
        $result = $conn->query("SELECT id, username, email, is_active, created_at FROM admin_users ORDER BY id");
        if ($result->num_rows === 0) {
            echo "No admin users found.\n";
            break;
        }
        printf("%-5s %-16s %-9s %s\n", 'ID', 'USERNAME', 'ACTIVE', 'EMAIL');
        while ($row = $result->fetch_assoc()) {
            printf(
                "%-5d %-16s %-9s %s\n",
                $row['id'],
                $row['username'],
                $row['is_active'] ? 'yes' : 'no',
                $row['email'] ?? ''
            );
        }
        break;

    default:
        fwrite(STDERR, "Unknown action '$action'.\n");
        fwrite(STDERR, "Available: create <username> <password> [email] | reset <username> <password> | list\n");
        exit(1);
}