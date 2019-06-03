const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
// const axios = require('axios');
require('dotenv').config();

// Sends Saved Function Name To The Database
router.post('/', (req, res) => {
    const text = req.body.text;
    // const id = req.body.project_id;
    console.log('req.body.text:', req.body.text);
    const queryText = `INSERT INTO "words" (text, project_id) VALUES ($1, 1);`;
    pool.query(queryText, [text])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
}); // End router.post/api/name

// Gets Saved Names from the Database
router.get('/', (req, res) => {
    const queryText = `SELECT`
    pool.query(queryText)
        .then(response => {
            console.log('get saved names response:', response.data)
            res.send(reponse.data)
        }).catch(err => {
            res.sendStatus(500)
        });
}); // End router.get/api/name

module.exports = router;