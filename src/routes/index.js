const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    //res.send('Welcome to page');
    res.render('index');
});

module.exports = router;