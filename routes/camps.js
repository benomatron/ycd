var router = require('express').Router({mergeParams: true});

var Camp = require('../models/camps');
var midObj = require('../middleware');

router.get('/', function (req, res) {
    Camp.find({}, function (err, camplist) {
        if (err) {
            res.send(err);
        } else {
            res.render('index', {camps: camplist});
        }
    });
});

router.get('/new', midObj.isLoggedIn, function (req, res) {
    res.render('camps/new', {message: req.flash('error')});
});

router.get('/:id/edit', midObj.isCampOwner, function (req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        res.render('camps/edit', {camp: camp});
    });
});

router.post('/', midObj.isLoggedIn, function (req, res) {
    var campName = req.sanitize(req.body['camp-name']);
    var imageUrl = '/images/camping/' + req.sanitize(req.body['img-url']);
    var desc = req.sanitize(req.body['desc']);
    Camp.find({name: campName}, function (err, camp) {
        if (err) {
            console.log(err);
        } else if (camp.length) {
            console.log('camp exists');
        } else {
            Camp.create({name: campName, image: imageUrl, description: desc, creator: req.user});
        }
    });
    res.redirect('/camps');
});

router.delete('/:id', midObj.isLoggedIn, function (req, res) {
    Camp.findOneAndRemove({_id: req.params.id}, function (err, thing) {
        if (err) {
            console.log(err);
        } else {
            console.log('killed camp');
        }
    });
    res.redirect('/camps');
});

router.put('/:id', midObj.isLoggedIn, function (req, res) {
    // refactor this as iterator
    req.body.camp.name = req.sanitize(req.body.camp.name);
    req.body.camp.image = req.sanitize(req.body.camp.image);
    req.body.camp.description = req.sanitize(req.body.camp.description);
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, {}, function (err, thing) {
        if (err) {
            console.log(err);
        } else {
            console.log('updated camp');
            res.redirect('/camps/' + req.params.id);
        }
    });
});

router.get('/:id', function (req, res) {
    Camp.findById(req.params.id)
        .populate({path: "comments", populate: {path: "author"}})
        .populate({path: "creator"})
        .exec(function (err, camp) {
        if (err) {
            res.send(err);
        } else {
            res.render('camps/show', {camp: camp});
        }
    });
});

module.exports = router;
