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
    sport_id INT NOT NULL,
    event_pic VARCHAR,
    description VARCHAR
);

CREATE TABLE players_events (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id) ON DELETE CASCADE NOT NULL, --CASCADE so that when deleting an event we automatically delete records in this table too
    player_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    unique(event_id, player_id) --so that a user cannot join twice to the same event
);

INSERT INTO sports (name)
VALUES ('basketball'),
       ('soccer'),
       ('volleyball'),
       ('tennis'),
       ('handbal'),
       ('football');

INSERT INTO users (fullname, username, email, password_digest, zip_code, profile_pic, exp_points)
VALUES('Alejandro Franco', 'alejo4373', 'alejandro@gmail.com', '$2a$10$7UQ3CrFUnzTxqJ246evvEeKB81ISV5lNjlgs7/ai1.QCLoCjd/IGG', 11369, '/images/user.png', 50),
      ('Martin Ramirez', 'maito2018', 'maitoawesome@gmail.com', '$2a$10$7UQ3CrFUnzTxqJ246evvEeKB81ISV5lNjlgs7/ai1.QCLoCjd/IGG', 11369, '/images/user.png', 50),
      ('Joyce Ajagbe', 'olu_joya', 'olu_joya@gmail.com', '$2a$10$7UQ3CrFUnzTxqJ246evvEeKB81ISV5lNjlgs7/ai1.QCLoCjd/IGG', 11369, '/images/user.png', 50)
      ;

INSERT INTO users_sports (sport_id, user_id)
VALUES(1, 1),
      (2, 1)
      ;

INSERT INTO events (host_id, lat, long, start_ts, end_ts, name, location, sport_id, event_pic, description)
VALUES (1, 40.7580278, -73.881801, 1521754233284, 1521755961187, 'Soccer at the park', 'Bryant Park', 2, '/images/event.png', '6x6 bring hydration'),
       (2, 40.747387, -73.949494, 1521754233284, 1521755961187, 'Basketball with Matt', 'Romeos Park', 1, '/images/event.png', '5x5 rain or shine'),
       (2, 40.7582048, -73.8578325, 1521754233284, 1521755961187, 'Baseball at City Field', 'City Field', 4, '/images/event.png', 'rain or shine')
       ;

INSERT INTO players_events(event_id, player_id)
VALUES(1, 2),
      (1, 3),
      (1, 1),
      (2, 2) 
      ;