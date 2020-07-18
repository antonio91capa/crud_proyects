const pool = require('../config/database');
const proyectsController = {};

proyectsController.renderAddProyect = (req, res) => {
    res.render('proyects/add');
};

proyectsController.addProyect = async (req, res) => {
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
};

proyectsController.renderProyects = async (req, res) => {
    const proyects = await pool.query('SELECT * FROM proyects WHERE user_id=?', [req.user.id]);
    const options = {};

    if (proyects.length > 0) {
        options.flag = true;
        options.proyects = proyects;

        res.render('proyects/list', { options });
    } else {
        options.message = 'There are not proyects';

        res.render('proyects/list', { options });
    }
};

proyectsController.renderEditProyect = async (req, res) => {
    const { id } = req.params;
    const proyects = await pool.query('SELECT * FROM proyects WHERE id=?', [id]);
    res.render('proyects/edit', { proyect: proyects[0] });
};

proyectsController.editProyect = isLoggedIn, async (req, res) => {
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
};

proyectsController.deleteProyect = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM proyects WHERE id=?', [id]);
    req.flash('success', 'Proyect removed successfully');
    res.redirect('/proyects');
};

module.exports = proyectsController;