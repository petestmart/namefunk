const express = require('express');
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
require('dotenv').config();


// GET All Projects from the DB Associated with Current User
router.get('/', (req, res) => {
    console.log('req.user.id:', req.user.id);
    const user_id = req.user.id;    
    const queryText = `SELECT * FROM "project" WHERE "user_id"=$1;`;
    pool.query(queryText, [user_id])
        .then((result) => {
            console.log('Get Projects', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
}); // End router.get/api/project

// Sends Project Name To DB.  Associates User with Project
router.post('/', (req, res) => {
    console.log('req.body.project_name', req.body.project_name);
    console.log('req.user.id:', req.user.id);
    const project_name = req.body.project_name;
    const user_id = req.user.id;
    
    const queryText = `INSERT INTO "project" ("user_id", "project_name") VALUES ($1, $2);`;
    pool.query(queryText, [user_id, project_name])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
}); // End router.post/api/project

module.exports = router;