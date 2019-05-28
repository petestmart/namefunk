const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/', (req, res) => {
    axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${req.query.tag}?key=${process.env.MW_THESAURUS_API_KEY}`)
        .then(response => {
            console.log('thesaurus router', response.data)
            res.send(response.data)
        }).catch(err => {
            res.sendStatus(500)
        });
}); // End GET to Thesaurus

module.exports = router;