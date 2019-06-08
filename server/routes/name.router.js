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
    console.log('router.post req.body.project_id:', req.body.project_id);
    console.log('router.post req.body.text:', req.body.text);
    const queryText = `INSERT INTO "words" (text, project_id) VALUES ($1, $2);`;
    pool.query(queryText, [text, project_id])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
}); // End router.post/api/name


router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('name router.get req.user.id', req.user.id);
    console.log('name router.get req.params.id', req.params.id);
    // const user_id = req.user.id;
    const project_id = req.params.id;
    const queryText = `SELECT "words"."id", "words"."text", "words"."project_id", "project"."user_id", "project"."project_name" FROM "words" JOIN "project" ON "project"."id" = "words"."project_id" WHERE "project_id"=$1;`;
    pool.query(queryText, [project_id])
    .then((result) => {
        console.log('Get Saved Names for Current Proj', result.rows);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});  // End router.get/api/name/:id

// Delete from database in "words" table
router.delete('/:id', (req, res) => {
    console.log('name router.delete req.params.id:', req.params.id);
    const id = req.params.id;
    const queryText = 'DELETE FROM "words" WHERE "id"=$1;';
    pool.query(queryText, [id])
        .then(() => {res.sendStatus(200);})
        .catch((err) => {
            console.log('Error completing DELETE saved name:', err);
        });
}); // End router.delete/api/name/:id

module.exports = router;