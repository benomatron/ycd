var mongoose = require('mongoose');

var campSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model('Camp', campSchema);
