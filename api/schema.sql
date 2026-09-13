-- ActionSteps Counseling - Articles & Admin database schema
-- Run this in phpMyAdmin (SQL tab) or via the MySQL command line to create
-- the database tables used by the articles feature and the admin section.

CREATE DATABASE IF NOT EXISTS `actionsteps`;
USE `actionsteps`;

-- Drop existing tables if you want to start fresh (uncomment if needed):
-- DROP TABLE IF EXISTS `articles`;
-- DROP TABLE IF EXISTS `admin_users`;

CREATE TABLE IF NOT EXISTS `articles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `excerpt` TEXT NOT NULL,
  `body` LONGTEXT NOT NULL,
  `cover_image` VARCHAR(500) DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT 'Article',
  `author` VARCHAR(150) NOT NULL DEFAULT 'ActionSteps Counseling',
  `status` ENUM('draft','published') NOT NULL DEFAULT 'draft',
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `status` (`status`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin users table. A seeded admin account is inserted below (see INSERT
-- statement after this table). Additional admins can be added via the
-- Admin portal (Admin -> Users) or the CLI tool:
--   php api/tools/create-admin.php create <username> <password> [email]
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed the initial admin account.
--   Username : admin
--   Password : Admin@123   (CHANGE THIS IMMEDIATELY after first login!)
-- Hash below = bcrypt("Admin@123"). Update it via the Admin portal:
--   Admin -> Users (or Settings) -> change password.
INSERT INTO `admin_users` (`username`, `email`, `password_hash`)
VALUES ('admin', 'office@actionstepscounseling.org', '$2b$10$U88ok/vw8c7F9qugjnLgYuRO5/Bd4FB5pIKfVoH/LKr/iDIcMyOe.')
ON DUPLICATE KEY UPDATE `username` = VALUES(`username`);