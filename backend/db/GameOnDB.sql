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

CREATE TYPE team_type AS ENUM ('A', 'B'); --So that a team can only be A or B
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    host_id INT NOT NULL,
    --host_id VARCHAR NOT NULL REFERENCES users(id),
    lat DOUBLE PRECISION NOT NULL,
    long DOUBLE PRECISION NOT NULL,
    start_ts BIGINT NOT NULL,
    end_ts BIGINT NOT NULL,
    actual_start_ts BIGINT,
    actual_end_ts BIGINT,
    name VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    sport_id INT NOT NULL,
    sport_format_id INT NOT NULL,
    event_pic VARCHAR,
    description VARCHAR,
    cancelled BOOLEAN,
    winner_team team_type
);

CREATE TABLE players_events (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id) ON DELETE CASCADE NOT NULL, --CASCADE so that when deleting an event we automatically delete records in this table too
    player_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    team team_type NOT NULL,
    match_judge BOOLEAN DEFAULT FALSE, 
    unique(event_id, player_id) --so that a user cannot join twice to the same event
);

CREATE TABLE sports_format (
    id SERIAL PRIMARY KEY,
    sport_id INT REFERENCES sports(id),
    description VARCHAR,
    num_players VARCHAR
);

INSERT INTO sports (name)
VALUES ('basketball'),
       ('soccer'),
       ('volleyball'),
       ('tennis'),
       ('handball'),
       ('football');

INSERT INTO sports_format (sport_id, description, num_players)
       --┌basketball
VALUES ('1', '1x1', 1),
       ('1', '2x2', 4),
       ('1', '3x3', 6),
       ('1', '4x4', 8),
       ('1', '5x5', 10),
       --┌Soccer
       ('2', '1x1', 2),
       ('2', '3x3', 6),
       ('2', '4x4', 8),
       ('2', '5x5', 10),
       ('2', '6x6', 12),
       ('2', '7x7', 14),
       ('2', '8x8', 16),
       ('2', '9x9', 18),
       ('2', '10x10', 20),
       ('2', '11x11', 21),
       --┌Volleyball
       ('3', '3x3', 6),
       ('3', '4x4', 8),
       ('3', '5x5', 10),
       ('3', '6x6', 12),
       --┌Tennis
       ('4', '1x1', 2),
       ('4', '2x2', 4), --sport id 21
       --┌Handball
       ('5', '1x1', 2),
       ('5', '2x2', 4),
       ('5', '3x3', 6), --24
      --┌Football
       ('6', '6x6', 12),
       ('6', '7x7', 14),
       ('6', '8x8', 16),
       ('6', '9x9', 18),
       ('6', '10x10', 20),
       ('6', '11x11', 21)
       ;

INSERT INTO users (fullname, username, email, password_digest, zip_code, profile_pic, exp_points)
VALUES('Alejandro Fraco', 'AlejandroF', 'antonioReyes@gmail.com', '$2a$10$7UQ3CrFUnzTxqJ246evvEeKB81ISV5lNjlgs7/ai1.QCLoCjd/IGG', 11369, 'https://avatars1.githubusercontent.com/u/18352555?s=460&v=4', 50),
      ('Kelvin Rodriguez', 'KelvinRo', 'kelvinro@gmail.com', '$2a$10$7UQ3CrFUnzTxqJ246evvEeKB81ISV5lNjlgs7/ai1.QCLoCjd/IGG', 11369, '/users/kelvin.jpg', 50),
      ('Joyce Ajagbe', 'olu_joya', 'olu_joya@gmail.com', '$2a$10$7UQ3CrFUnzTxqJ246evvEeKB81ISV5lNjlgs7/ai1.QCLoCjd/IGG', 11369, '/images/user.png', 50),
      ('Romi', 'MichaelSSS', 'kelvinro@gmail.com', '$2a$10$7UQ3CrFUnzTxqJ246evvEeKB81ISV5lNjlgs7/ai1.QCLoCjd/IGG', 11369, '/images/user.png', 50),
      ('Nathan Cook', 'NCooker', 'kelvinro@gmail.com', '$2a$10$7UQ3CrFUnzTxqJ246evvEeKB81ISV5lNjlgs7/ai1.QCLoCjd/IGG', 11369, '/images/user.png', 50),
      ('Matha Pullman', 'Mathinna19', 'kelvinro@gmail.com', '$2a$10$7UQ3CrFUnzTxqJ246evvEeKB81ISV5lNjlgs7/ai1.QCLoCjd/IGG', 11369, '/images/user.png', 50),
      ('Carolina Restrepo', 'CarolinaRR', 'kelvinro@gmail.com', '$2a$10$7UQ3CrFUnzTxqJ246evvEeKB81ISV5lNjlgs7/ai1.QCLoCjd/IGG', 11369, '/images/user.png', 50);

INSERT INTO users_sports (sport_id, user_id)
VALUES(1, 1),
      (2, 1),
      (1, 2),
      (2, 2),
      (4, 2),
      (5, 5)
      ;

INSERT INTO events (host_id, lat, long, start_ts, end_ts, actual_start_ts, actual_end_ts, name, location, sport_id, sport_format_id, event_pic, description, cancelled)
VALUES (1, 40.762826, -73.884249, 1521754233284, 1521755961187, 1521755233284, 1521756961187, 'Soccer at the park', 'Gorman Playground', 2, 6, '/images/soccer1.jpg', 'Hey Footballers all over New York City. Let''s get together to play friendly, competitive and fun pickup games. Come and exercise physically and mentally. Grow & develop yourself with others through the sport of soccer.', FALSE),
       (2, 40.747387, -73.949494, 1521754233284, 1521755961187, 1521755233284, 1521756961187, 'Basketball with Matt', 'Romeos Park', 1, 2, '/images/basketball1.jpg', 'Rain or shine', FALSE),
       (2, 40.758204, -73.857832, 1521754233284, 1521755961187, 1521755233284, 1521756961187, 'Tennis at City Field', 'City Field', 4, 19, '/images/tennis1.jpg', 'Rain or shine', FALSE),
       (1, 40.720012, -73.951192, 1523400900000, 1523408100000,NULL,NULL,'Pick up Soccer @ Park','McCarren Park',2,6,'https://u90soccer.com/wp/wp-content/uploads/2014/04/u90270.jpg','Let''s play a good soccer game!!', FALSE),
       (3, 40.731780, -74.032469, 1523487660000, 1523491260000,NULL,NULL,'American Football','Newport Green Park',6,26,'https://s.wsj.net/public/resources/images/BN-UZ206_FBALLV_P_20170906191432.jpg','Like sex and the city but with soccer.',FALSE),
       (4, 40.728885, -73.973503, 1523620800000, 1523626200000,NULL,NULL,'Futbol - Soccer NYC','Con Edison Field, Avenue C',2,15,'https://c1.staticflickr.com/9/8265/8663297305_37aed14f3d_b.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat massa sit amet blandit venenatis. Suspendisse eget luctus purus, vel tristique enim. Donec feugiat facilisis eros, ut tincidunt justo ultrices ac. Aliquam a tempus dolor. Aenean in pretium eros, dignissim aliquet risus. ', FALSE),
       (2, 40.753665, -73.983498 ,152397180000, 152397180000 ,NULL,NULL, 'Tennis & Yellow balls', 'Bryant Park',4,20 ,'http://assets.nydailynews.com/polopoly_fs/1.1454400.1379033025!/img/httpImage/image.jpg_gen/derivatives/article_750/tennis13n-4-web.jpg' , 'Vestibulum nec vehicula metus, eu ultrices eros. Etiam volutpat neque eget efficitur vestibulum. Suspendisse molestie bibendum enim nec malesuad', FALSE),
       (6, 40.758857, -73.991295 ,152397180000, 152397180000 ,NULL,NULL, 'Handball Bros', 'McCaffrey Playground',5,24 ,'http://i.imgur.com/ww5oTiQ.jpg' , 'Vestibulum nec vehicula metus, eu ultrices eros. Etiam volutpat neque eget efficitur vestibulum. Suspendisse molestie bibendum enim nec malesuad', FALSE)
       ;
--Soccer and The City
INSERT INTO players_events(event_id, player_id, team, match_judge)
VALUES(1, 2, 'A', FALSE),
      (1, 3, 'B', TRUE),
      (1, 1, 'A', TRUE),
      (2, 2, 'A', TRUE),
      (3, 2, 'A', TRUE),
      (7, 2, 'A', TRUE),
      (8, 6, 'A', TRUE)
      ;
