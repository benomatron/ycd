var mongoose = require('mongoose');
var Camp = require('./models/camps');
var Comment = require('./models/comment');
var User = require('./models/user');


var oldcamps = [
    {name: 'cheese', image: '/images/camping/' + '01.gif',
     description: 'shit hole In et libero sed nibh ornare vestibulum. Curabitur blandit placerat neque sed luctus. Sed fermentum pharetra eros, sed faucibus nibh gravida in. Etiam metus erat, pulvinar sit amet diam tempor, laoreet tincidunt dui. Nam ultricies urna dolor, at dapibus diam maximus dignissim. Duis non metus dignissim, finibus leo sit amet, congue ex. Suspendisse vitae ornare tellus. Morbi aliquam hendrerit risus a vestibulum. Sed eu lectus nisi. Curabitur consectetur est dolor, tempor condimentum massa facilisis sed. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris dignissim massa turpis, id consequat quam accumsan ac.'},
    {name: 'blanket', image: '/images/camping/' + '02.gif',
     description: 'ass clowns In et libero sed nibh ornare vestibulum. Curabitur blandit placerat neque sed luctus. Sed fermentum pharetra eros, sed faucibus nibh gravida in. Etiam metus erat, pulvinar sit amet diam tempor, laoreet tincidunt dui. Nam ultricies urna dolor, at dapibus diam maximus dignissim. Duis non metus dignissim, finibus leo sit amet, congue ex. Suspendisse vitae ornare tellus. Morbi aliquam hendrerit risus a vestibulum. Sed eu lectus nisi. Curabitur consectetur est dolor, tempor condimentum massa facilisis sed. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris dignissim massa turpis, id consequat quam accumsan ac.'},
    {name: 'torpedo', image: '/images/camping/' + '03.gif',
     description: 'punk ass bitches In et libero sed nibh ornare vestibulum. Curabitur blandit placerat neque sed luctus. Sed fermentum pharetra eros, sed faucibus nibh gravida in. Etiam metus erat, pulvinar sit amet diam tempor, laoreet tincidunt dui. Nam ultricies urna dolor, at dapibus diam maximus dignissim. Duis non metus dignissim, finibus leo sit amet, congue ex. Suspendisse vitae ornare tellus. Morbi aliquam hendrerit risus a vestibulum. Sed eu lectus nisi. Curabitur consectetur est dolor, tempor condimentum massa facilisis sed. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris dignissim massa turpis, id consequat quam accumsan ac.'},
    {name: 'woodchuck', image: '/images/camping/' + '04.gif',
     description: 'butt snake In et libero sed nibh ornare vestibulum. Curabitur blandit placerat neque sed luctus. Sed fermentum pharetra eros, sed faucibus nibh gravida in. Etiam metus erat, pulvinar sit amet diam tempor, laoreet tincidunt dui. Nam ultricies urna dolor, at dapibus diam maximus dignissim. Duis non metus dignissim, finibus leo sit amet, congue ex. Suspendisse vitae ornare tellus. Morbi aliquam hendrerit risus a vestibulum. Sed eu lectus nisi. Curabitur consectetur est dolor, tempor condimentum massa facilisis sed. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris dignissim massa turpis, id consequat quam accumsan ac.'},
    {name: 'salami', image: '/images/camping/' + '05.gif',
     description: 'opie cunningham In et libero sed nibh ornare vestibulum. Curabitur blandit placerat neque sed luctus. Sed fermentum pharetra eros, sed faucibus nibh gravida in. Etiam metus erat, pulvinar sit amet diam tempor, laoreet tincidunt dui. Nam ultricies urna dolor, at dapibus diam maximus dignissim. Duis non metus dignissim, finibus leo sit amet, congue ex. Suspendisse vitae ornare tellus. Morbi aliquam hendrerit risus a vestibulum. Sed eu lectus nisi. Curabitur consectetur est dolor, tempor condimentum massa facilisis sed. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris dignissim massa turpis, id consequat quam accumsan ac.'},
    {name: 'sinkhole', image: '/images/camping/' + '06.gif',
     description: 'In et libero sed nibh ornare vestibulum. Curabitur blandit placerat neque sed luctus. Sed fermentum pharetra eros, sed faucibus nibh gravida in. Etiam metus erat, pulvinar sit amet diam tempor, laoreet tincidunt dui. Nam ultricies urna dolor, at dapibus diam maximus dignissim. Duis non metus dignissim, finibus leo sit amet, congue ex. Suspendisse vitae ornare tellus. Morbi aliquam hendrerit risus a vestibulum. Sed eu lectus nisi. Curabitur consectetur est dolor, tempor condimentum massa facilisis sed. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris dignissim massa turpis, id consequat quam accumsan ac. itemized list of pubes'}
];


function seedDB() {

    User.findOne({username: 'a'}, function (err, user) {
        if (err) {
            console.log(err);
        } else if (!user) {
            var newUser = new User({username: 'a'});
            User.register(newUser, 'a', function (err, user) {
                if (err) {
                    console.log(err)
                }
            });
        }
    });

    Comment.remove({}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            Camp.remove({}, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    User.findOne({username: 'a'}, function(err, user) {
                        oldcamps.forEach(function (camp) {
                            Camp.create({name: camp.name, image: camp.image, description: camp.description, creator: user}, function (err, camp) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    camp.save();
                                }
                            });
                        });
                    });
                }
            });
        }
    });
}

module.exports = seedDB;
