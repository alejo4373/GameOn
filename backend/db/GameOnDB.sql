DROP DATABASE IF EXISTS gameon_db;
CREATE DATABASE gameon_db;

\c gameon_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR NOT NULL,
    password_digest VARCHAR,
    zip_code INT NOT NULL,
    profile_pic VARCHAR,
    exp_points INT
);

CREATE TABLE sports (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE sports_proficiency (
  user_id INT REFERENCES users(id),
  sport_id INT REFERENCES sports(id),
  proficiency INT NOT NULL
);

INSERT INTO sports (name)
VALUES ('basketball'),
       ('soccer'),
       ('volleyball'),
       ('tennis'),
       ('handball'),
       ('football')

