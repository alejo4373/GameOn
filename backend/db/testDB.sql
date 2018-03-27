DROP DATABASE IF EXISTS gameon_db_test;
CREATE DATABASE gameon_db_test;

\c gameon_db_test;

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

CREATE TABLE users_sports(
  user_id INT REFERENCES users(id) NOT NULL,
  sport_id INT REFERENCES sports(id) NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    host_id INT NOT NULL,
    --host_id VARCHAR NOT NULL REFERENCES users(id),
    lat DOUBLE PRECISION NOT NULL,
    long DOUBLE PRECISION NOT NULL,
    start_ts BIGINT NOT NULL,
    end_ts BIGINT NOT NULL,
    name VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    sport_id VARCHAR NOT NULL,
    event_pic VARCHAR,
    description VARCHAR
);

CREATE TABLE players_events (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id) ON DELETE CASCADE NOT NULL, --CASCADE so that when deleting an event we automatically delete records in this table too
    player_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    unique(event_id, player_id) --so that a user cannot join twice to the same event
);