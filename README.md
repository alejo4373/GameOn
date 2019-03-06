# GameOn

## Introduction

Welcome to **GameOn** a Full-Stack Web App that allows users to connect, play and rank in sport of their liking through a platform that enables them to find games to play wherever and whenever they want.

Built with React.js, Node.js with Express, and PostgreSQL.

## Live @ [gameon-letsplay.herokuapp.com](https://gameon-letsplay.herokuapp.com/)

## Local Setup

You must have installed [Node.js](https://nodejs.org) as well as [PostgreSQL](https://www.postgresql.org/) in your computer.

You can check for these dependencies with `node -v` and `psql -v`. If your shell/terminal doesn't complain and you see version numbers you are good to go.

  1. Clone this repo and change directory to it: 

         git clone git@github.com:alejo4373/GameOn.git && cd GameOn 

  2. Install dependencies for the Node/Express Server (`backend` folder):

         cd backend && npm install

  3. Install dependencies the React App (`frontend` folder):

         cd frontend && npm install

  4. Create database and seed sample data while being in the `GameOn` directory with:

         psql -f ./backend/db/GameOnDB.sql
        > [Make sure PostgreSQL is running!](https://www.google.com/search?q=make+sure+postgres+is+running&oq=make+sure+postf&aqs=chrome.1.69i57j0l5.5280j1j7&client=ubuntu&sourceid=chrome&ie=UTF-8)

  5. To launch the Node/Express server, inside the `backend` folder run: 

          npm start

  6. To launch the React App, inside the `frontend` folder, and preferably in another terminal window run: 

          npm start

  7. A new browser tab should have been opened and the App should be running. If that is not the case check the terminals output for errors, if you are unable to troubleshoot the problem, I would be happy to address issues so open [one](/issues)
