const express = require('express');

const pool = require('../config/database');
const { isLoggedIn } = require('../lib/auth');

const router = express.Router();

router.get('/add', isLoggedIn, (req, res) => {
    res.render('proyects/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    console.log(req.body);
    const { name, description, status } = req.body;
    const newProyect = {
        name,
        description,
        status,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO proyects SET ?', [newProyect]);

    req.flash('success', 'Proyect saved successfully');
    res.redirect('/proyects');
});

router.get('/', isLoggedIn, async (req, res) => {
    const proyects = await pool.query('SELECT * FROM proyects WHERE user_id=?', [req.user.id]);
    const flag = proyects.length > 0 ? true : false;

    if(flag){
        res.render('proyects/list', { options: [{flag:flag, proyects: proyects}] });
    }else{

    }
    
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM proyects WHERE id=?', [id]);
    req.flash('success', 'Proyect removed successfully');
    res.redirect('/proyects');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const proyects = await pool.query('SELECT * FROM proyects WHERE id=?', [id]);
    res.render('proyects/edit', { proyect: proyects[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const newProyect = {
        name,
        description,
        status
    };
    await pool.query('UPDATE links SET ? WHERE id=? ', [newProyect, id]);
    req.flash('success', 'Proyect Updated successfully');
    res.redirect('/proyects');
});

module.exports = router;