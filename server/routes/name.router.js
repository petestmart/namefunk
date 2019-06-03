const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
// const axios = require('axios');
require('dotenv').config();

// Sends Saved Function Name To The Database
router.post('/', (req, res) => {
    const text = req.body.text;
    console.log('req.body.text:', req.body.text);
    const queryText = `INSERT INTO "words" (text) VALUES ($1);`;
    pool.query(queryText, [text])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
}); // End router.post/api/name

module.exports = router;