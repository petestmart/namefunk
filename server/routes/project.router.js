const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
require('dotenv').config();

router.post('/', (req, res) => {
    const queryText = `INSERT INTO "words" (text) VALUES ('project test text');`;
    pool.query(queryText)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});

module.exports = router;