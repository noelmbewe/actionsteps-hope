<?php
/**
 * ActionSteps Counseling — Database migration tool.
 *
 * Optional helper: brings an existing database up to date with any columns the
 * current code expects. Note that the API now auto-migrates on first request,
 * so you usually DON'T need to run this manually.
 *
 * Usage (from the api/tools folder):  php migrate.php
 * Or open in a browser if PHP CLI isn't available.
 */

require_once __DIR__ . '/../helpers.php';

$config = load_config();
$conn = get_connection($config);

echo "Connected to database `{$config['db']['name']}`\n";

ensure_schema($conn, $config);

echo "Migration complete (all expected columns are present).\n";