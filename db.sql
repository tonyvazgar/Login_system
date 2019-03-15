CREATE TABLE users ( user_id SERIAL PRIMARY KEY, password VARCHAR(50) NOT NULL );

CREATE TABLE rol ( rol_id serial PRIMARY KEY);

CREATE TABLE permission (perm_id serial PRIMARY KEY, p_str VARCHAR(50), type VARCHAR(50) );