// ========== PROJECT ROUTER ========== //

const express = require('express');
const router = express.Router();
// const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
require('dotenv').config();


// GET All Projects from the DB Associated with Current User
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('proj router.get req.user.id:', req.user.id);
    const user_id = req.user.id;
    const queryText = `SELECT "project"."id", "project"."user_id", "project"."project_name" 
        FROM "project" FULL JOIN "words" ON "words"."project_id" = "project"."id" 
        WHERE "user_id"=$1 
        GROUP BY "project"."id"
        ORDER BY "project"."id" DESC
        ;`;
    pool.query(queryText, [user_id])
        .then((result) => {
            console.log('Get Projects', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
}); // End router.get/api/project

// Sends Project Name To DB.  Associates User with Project
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('req.body.project_name', req.body.project_name);
    console.log('req.user.id:', req.user.id);
    const project_name = req.body.project_name;
    const user_id = req.user.id;

    const queryText = `INSERT INTO "project" ("user_id", "project_name") VALUES ($1, $2) RETURNING "id";`;
    pool.query(queryText, [user_id, project_name])
        .then((result) => res.send(result.rows))
        
        .catch(() => res.sendStatus(500));
}); // End router.post/api/project

router.delete('/:id', (req, res) => {
    console.log('req.params.id:', req.params.id);
    const queryText = 'DELETE FROM "project" WHERE "id"=$1;';
    pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing DELETE project', err);
        });
});

module.exports = router;