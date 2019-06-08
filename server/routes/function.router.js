const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
require('dotenv').config();

router.get('/get', rejectUnauthenticated, (req, res) => {
    console.log('function router.get req.params', req.params.function);
    // const funk = req.params.function;
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
    console.log('function router.get req.params', req.params.function);
    // const funk = req.params.function;
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
    console.log('function router.get req.params', req.params.function);
    // const funk = req.params.function;
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
    console.log('function router.get req.params', req.params.function);
    // const funk = req.params.function;
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