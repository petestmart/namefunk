const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
// const axios = require('axios');
require('dotenv').config();

// Sends Saved Function Name To The Database
router.post('/', (req, res) => {
    const queryText = `INSERT INTO "words" (text) VALUES ('name test text');`;
    pool.query(queryText)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
}); // End router.post/api/name

module.exports = router;