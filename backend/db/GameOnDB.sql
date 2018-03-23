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

CREATE TABLE invitations (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id) NOT NULL,
    host_id INT NOT NULL,
    -- invitee_id INT REFERENCES users(id) Should be this way but left out because we dont have users inserted and will give us an error
    invitee_id INT NOT NULL 
);

INSERT INTO sports (name)
VALUES ('basketball'),
       ('soccer'),
       ('volleyball'),
       ('tennis'),
       ('handbal'),
       ('football');

INSERT INTO events (host_id, lat, long, start_ts, end_ts, name, location, sport_id, event_pic, description)
VALUES (1, 40.747387, -73.949494, 1521754233284, 1521755961187, 'Soccer at the park', 'Bryant Park', 2, '/images/event.png', '6x6 bring hydration'),
       (2, 40.747387, -73.949494, 1521754233284, 1521755961187, 'Basketball with Matt', 'Romeos Park', 1, '/images/event.png', '5x5 rain or shine')
       ;
