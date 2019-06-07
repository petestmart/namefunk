const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
// const axios = require('axios');
require('dotenv').config();

// Sends Saved Function Name To The Database
router.post('/', rejectUnauthenticated, (req, res) => {
    const text = req.body.text;
    const project_id = req.body.project_id;
    console.log('router.post req.body', req.body);
    console.log('req.body.project_id:', req.body.project_id);
    console.log('req.body.text:', req.body.text);
    const queryText = `INSERT INTO "words" (text, project_id) VALUES ($1, $2);`;
    pool.query(queryText, [text, project_id])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
}); // End router.post/api/name

// Gets Saved Names from the Database
// router.get('/', rejectUnauthenticated, (req, res) => {
//     console.log('In name.router.get. req.body.project_id:', req.body);
//     const queryText = `SELECT * FROM "words" WHERE "project_id"=$1;`
//     pool.query(queryText, [req.body])
//         .then(response => {
//             console.log('get saved names response:', response.data)
//             res.send(reponse.data)
//         }).catch(err => {
//             res.sendStatus(500)
//         });
// }); // End router.get/api/name

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('name router.get req.user.id', req.user.id);
    const user_id = req.user.id;
    // const project_id = req.body.project_id;
    const queryText = `SELECT * FROM "words" JOIN "project" ON "project"."id" = "words"."project_id" WHERE "user_id"=$1;`;
    pool.query(queryText, [user_id])
    .then((result) => {
        console.log('Get Saved Names for Current Proj', result.rows);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});

module.exports = router;