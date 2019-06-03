const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
require('dotenv').config();

router.post('/', (req, res) => {
    console.log('req.body', req.body.text)
    // const text = req.body.text;
    const queryText = `INSERT INTO "project" ("user_id", "project_name") VALUES (1, 'test dog');`;
    pool.query(queryText)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});

module.exports = router;