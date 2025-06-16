-- Table des confessions
CREATE TABLE IF NOT EXISTS confessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  text TEXT NOT NULL,
  intensity INT NOT NULL CHECK (intensity BETWEEN 1 AND 10),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table des tags prédéfinis
CREATE TABLE IF NOT EXISTS tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- Table des tags des confessions
CREATE TABLE IF NOT EXISTS confession_tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  confession_id INT NOT NULL,
  tag_id INT NOT NULL,
  FOREIGN KEY (confession_id) REFERENCES confessions(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Table des réponses
CREATE TABLE IF NOT EXISTS responses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  confession_id INT NOT NULL,
  text TEXT NOT NULL,
  is_psychologist BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (confession_id) REFERENCES confessions(id) ON DELETE CASCADE
);

-- Insertion des tags prédéfinis
INSERT IGNORE INTO tags (name) VALUES 
('culpabilité'),
('honte'),
('peur'),
('colère'),
('tristesse'),
('joie'),
('amour'),
('haine'),
('mensonge'),
('trahison'),
('jalousie'),
('envie'),
('doute'),
('confiance'),
('espoir'); 