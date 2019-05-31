const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
require('dotenv').config();

router.post('/', (req, res) => {
    console.log('req.body', req.body.text)
    const text = req.body.text;
    const queryText = `INSERT INTO "words" ("text") VALUES ($1);`;
    pool.query(queryText, [text])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});

module.exports = router;