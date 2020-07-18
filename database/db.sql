CREATE DATABASE crud_nodejs;
USE crud_nodejs;

-- Users Table
CREATE TABLE users(
    id INT(10) NOT NULL, 
    username VARCHAR(20) NOT NULL,
    password VARCHAR(150) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users 
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

-- Proyects Table
CREATE TABLE proyects(
    id INT(10) NOT NULL,
    name VARCHAR(80) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    user_id INT(10) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE proyects 
    ADD PRIMARY KEY (id);

ALTER TABLE proyects
    MODIFY id INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;