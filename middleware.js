var Camp = require('./models/camps');
var Comment = require('./models/comment');

var midObj = {
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash("error", 'please login');
            res.redirect('/login');
        }
    },
    isCampOwner: function (req, res, next) {
        if (req.isAuthenticated()) {
            Camp.findById(req.params.id)
                // is populate necessary?
                .populate('creator').exec(function (err, camp) {
                if (err) {
                    req.flash("error", err);
                    res.redirect('back');
                } else if (req.user._id.equals(camp.creator._id)) {
                    return next();
                } else {
                    req.flash("error", 'you need to be owner');
                    res.redirect('/camps');
                }
            });
        } else {
            req.flash("error", 'please login');
            res.redirect('/login');
        }
    },
    isCommentOwner: function (req, res, next) {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.cid)
                // is populate necessary?
                .populate('author').exec(function (err, comment) {
                if (err) {
                    req.flash("error", err);
                    res.redirect('back');
                } else if (req.user._id.equals(comment.author._id)) {
                    return next();
                } else {
                    req.flash("error", 'you need to be owner');
                    res.redirect('back');
                }
            });
        } else {
            req.flash("error", 'please login');
            res.redirect('/login');
        }
    }
}

module.exports = midObj;
