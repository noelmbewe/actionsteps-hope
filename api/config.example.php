<?php
/**
 * ActionSteps Counseling — API configuration
 *
 * Rename this file to config.php after filling in your database credentials.
 * These are the values from your cPanel/Hosting MySQL database settings.
 */
return [
    'db' => [
        'host' => 'localhost',
        'name' => 'DB_NAME_HERE',
        'user' => 'DB_USER_HERE',
        'pass' => 'DB_PASSWORD_HERE',
    ],
    // Change this to a long, random string and DO NOT share it. It is used to
    // sign the admin login tokens (JSON Web Tokens).
    'jwt_secret' => 'CHANGE_THIS_TO_A_LONG_RANDOM_STRING',
];