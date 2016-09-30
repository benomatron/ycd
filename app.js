var bodyParser = require('body-parser');
var express = require('express');
var expSanitizer = require('express-sanitizer');
var flash = require('connect-flash');
var inspect = require('inspect');
var localStrategy = require('passport-local');
var passport = require('passport');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var request = require('request');

//var Camp = require('./models/camps');
//var Comment = require('./models/comment');
var User = require('./models/user');

var campRoutes = require('./routes/camps');
var commentRoutes = require('./routes/comment');
var indexRoutes = require('./routes/index');

var seedDB = require('./seeds');

var app = express();
app.use(express.static(__dirname + '/public'));

app.use(require('express-session')({
    secret: "potato gunslinger moustache",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(expSanitizer());
app.use(flash());
app.use(methodOverride('_method'));

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errMsgs= req.flash('error');
    res.locals.infoMsgs= req.flash('info');
    next();
});

app.use("/camps", campRoutes);
app.use("/camps/:id/comments", commentRoutes);
app.use(indexRoutes);

app.set('view engine', 'ejs');

mongoose.connect('mongodb://admin:abc123@ds047666.mlab.com:47666/ycd');

seedDB();

// LISTENER
app.listen(process.env.PORT, process.env.IP, function () {
    console.log('boogers');
});
