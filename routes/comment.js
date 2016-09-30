var router = require('express').Router({mergeParams: true});

var Camp = require('../models/camps');
var Comment = require('../models/comment');
var midObj = require('../middleware');

router.post('/', midObj.isLoggedIn, function (req, res) {
    req.body.comment.text = req.sanitize(req.body.comment.text);
    req.body.comment.author = req.user;
    Camp.findById(req.params.id, function (err, camp) {
        if (err) {
            res.send(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect('/camps/' + camp.id);
                }
            });
        }
    });
});

router.get('/new', midObj.isLoggedIn, function (req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        if (err) {
            res.send(err);
        } else {
            res.render('comments/new', {camp: camp});
        }
    });
});

router.get('/:cid/edit', midObj.isCommentOwner, function (req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        Comment.findById(req.params.cid).populate('camp').exec(function (err, comment) {
            if (err) {
                res.redirect('back');
            } else {
                res.render('comments/edit', {comment: comment, camp: camp});
            }
        });
    });
});

router.put('/:cid', midObj.isCommentOwner, function (req, res) {
    req.body.comment.text = req.sanitize(req.body.comment.text);
    Comment.findByIdAndUpdate(req.params.cid, {text: req.body.comment.text}).exec(function (err, comment) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/camps/' + req.params.id);
        }
    });
});

router.delete('/:cid', midObj.isCommentOwner, function (req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        Comment.findByIdAndRemove(req.params.cid).populate('camp').exec(function (err, comment) {
            if (err) {
                res.redirect('back');
            } else {
                res.redirect('/camps/' + camp._id);
            }
        });
    });
});

module.exports = router;
