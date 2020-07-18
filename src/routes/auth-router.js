const express = require('express');

const { viewSignup, signup, viewSignIn, signin, logout, profile } = require('../controllers/auth-controller');
const { isLoggedIn } = require('../lib/auth');

const router = express.Router();

router.get('/signup', viewSignup);
router.post('/signup', signup);

router.get('/signin', viewSignIn);
router.post('/signin', signin);

router.get('/profile', isLoggedIn, profile);
router.get('/logout', isLoggedIn, logout);

module.exports = router;