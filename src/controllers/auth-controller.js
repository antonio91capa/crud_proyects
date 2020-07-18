const passport = require('passport');

const authController = {};

/*****************Signup *********************/
authController.viewSignup = (req, res) => {
    res.render('auth/signup');
};

authController.signup = passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
});

/***************** Signin *********************/
authController.viewSignIn = (req, res, next) => {
    res.render('auth/signin');
};

authController.signin = passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
});

/***************** Logout *********************/
authController.logout = (req, res, next) => {
    req.logOut();
    res.redirect('/');
};

authController.profile = (req, res) => {
    res.render('profile');
};

module.exports = authController;