const express = require('express');
const router = express.Router();
// const axios = require('axios');
require('dotenv').config();

router.post('/', (req, res) => {
    const queryText = 'INSERT INTO "';
    pool.query(queryText)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});
