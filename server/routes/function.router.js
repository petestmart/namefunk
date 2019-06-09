// ========== FUNCTION ROUTER ========== //
// RECEIVES SYNONYMS FOR FUNCTIONS THAT ARE STORED IN THE DATABASE //

const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
require('dotenv').config();

router.get('/get', rejectUnauthenticated, (req, res) => {
    const queryText = 'SELECT * FROM "get";';
    pool.query(queryText)
    .then((result) => {
        console.log('Get Function Names', result.rows);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});

router.get('/post', rejectUnauthenticated, (req, res) => {
    const queryText = 'SELECT * FROM "post";';
    pool.query(queryText)
        .then((result) => {
            console.log('Get Function Names', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
});

router.get('/put', rejectUnauthenticated, (req, res) => {
    const queryText = 'SELECT * FROM "put";';
    pool.query(queryText)
        .then((result) => {
            console.log('Get Function Names', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
});

router.get('/delete', rejectUnauthenticated, (req, res) => {
    const queryText = 'SELECT * FROM "delete";';
    pool.query(queryText)
        .then((result) => {
            console.log('Get Function Names', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;