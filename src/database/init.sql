-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS confessions_db;
USE confessions_db;

-- Create confessions table
CREATE TABLE IF NOT EXISTS confessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL,
    intensity INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Create confession_tags junction table
CREATE TABLE IF NOT EXISTS confession_tags (
    confession_id INT,
    tag_id INT,
    PRIMARY KEY (confession_id, tag_id),
    FOREIGN KEY (confession_id) REFERENCES confessions(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Insert some initial tags
INSERT IGNORE INTO tags (name) VALUES 
('kill'),
('meurtre'),
('violence'),
('zzz'); 