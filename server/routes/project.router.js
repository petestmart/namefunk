const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
require('dotenv').config();

router.post('/', (req, res) => {
    console.log('req.body', req.body.text)
    const text = req.body.text;
    const queryText = `INSTERT INTO "project" (user_id) VALUES $1. ; INSERT INTO "words" ("text") VALUES ($2);`;
    pool.query(queryText, [text])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});

module.exports = router;