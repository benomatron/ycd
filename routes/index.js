var passport = require('passport');
var router = require('express').Router({mergeParams: true})

var User = require('../models/user');
var isLoggedIn = require('../middleware').isLoggedIn;

router.get('/', function (req, res) {
    res.render('landing');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/camps',
    failureRedirect: '/login'
}), function (req, res) {
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            req.flash('info', 'goody goods fucker!');
            res.redirect('/login');
        });
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('info', 'bye bye fucker');
    res.redirect('/camps');
});

module.exports = router;
