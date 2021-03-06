# NameFunk - The Function Naming Tool For Programmers

NameFunk is the application for programmers around the globe to cut down on decision fatigue by telling you what to name your functions.  Simply enter a term that defines your project and NameFunk will provide you with ideas.  Create an account to save your function names and come back later to reference them.  

## Built With

This version uses React, Redux, Express, Passport, and PostgreSQL.  
Additional Technologies listed below (see "Additional Technologies Used"), and a full list of dependencies can be found in `package.json`.

## Getting Started

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### API Key

NameFunk uses the API from Merriam-Webster's Collegiate Thesaurus.  

Sign up for an API Key at: [Merriam-Webster's Collegiate Thesaurus](https://dictionaryapi.com/products/api-collegiate-thesaurus)

See "Installation Instructions" below for information on setting your API Key.


### Create database and table

Create a new database called `namefunk` and create tables using the SQL commands located in the database.sql file


If you would like to name your database something else, you will need to change `namefunk` to the name of your new database name in `server/modules/pool.js`


### Installation Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste these two lines into the file:
    ```
    MW_THESAURUS_API_KEY=merriamWebsterApiKey
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, replace `merriamWebsterApiKey` with the API Key you received from Merriam-Webster's Collegiate Thesaurus (see "API Key" if you do not have an API Key).  Also, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep the application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). You will receive a warning if you create a secret with less than eight characters or leave it as `superDuperSecret`.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

### Screen Shot

![screenshot](wireframes/NameFunkScreenShot.png)

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Additional Technologies Used
* HTML5
* CSS
* React.js
* React-Redux
* Redux-Saga
* Node.js
* Express
* Axios
* Material UI
* SweetAlert
* API from Merriam-Webster (for finding similar words)

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

### Authors
Pete St. Martin

### Acknowledgements
Dane Smith
Dev Jana
Ally Boyd
Chris Black
Luke Schlangen
Kris Szafranski
Mary Mosman
Baconian Cohort
