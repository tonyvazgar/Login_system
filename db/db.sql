CREATE DATABASE loginSystem;
USE loginSystem;
CREATE TABLE users ( user_id VARCHAR(50), pass VARCHAR(50) NOT NULL );
INSERT INTO users (user_id, pass) VALUES ('tony', '1234');
INSERT INTO users (user_id, pass) VALUES ('root', 'root');
CREATE TABLE rol ( rol_id serial PRIMARY KEY);
CREATE TABLE permission (perm_id serial PRIMARY KEY, p_str VARCHAR(50), type VARCHAR(50) );