const express = require('express');

const { isLoggedIn } = require('../lib/auth');
const { renderAddProyect, addProyect, renderProyects, renderEditProyect, editProyect, deleteProyect } = require('../controllers/proyects-controller');

const router = express.Router();

//Authorization
router.use(isLoggedIn);

//Routes Proyects
router.get('/add', renderAddProyect);
router.post('/add', addProyect);
router.get('/', renderProyects);
router.get('/edit/:id', renderEditProyect);
router.post('/edit/:id', editProyect);
router.get('/delete/:id', deleteProyect);

module.exports = router;