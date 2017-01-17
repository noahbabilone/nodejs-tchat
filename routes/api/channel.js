var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.post('/create', function (req, res, next) {
    var item = req.body;
    item.owner = req.user;
    item.members = [req.user];
    mongoose.model('Channel').create(item, function (err, item) {
        if (err) {
            res.status(400).json({status: 400, message: 'Bad request', error: err});
            return;
        } else {
            res.json(item);
        }
    });
});


router.get('/messages/:name', function (req, res, next) {
    if (req.user) {
        mongoose.model('Channel').findOne({'name': req.params.name}).exec(function (err, channel) {
            var isMember = false;

            isMember = channel.members.some(function (member) {
                console.log(member + " - " + req.user.id);
                if (member == req.user.id) {
                    return true;
                }
            })
            if (!isMember)
                res.status(401).json({status: 401, message: 'Forbidden : User cannot get messages if not in channel'});
            else {
                mongoose.model('Message').find({
                    channel: channel
                }).populate("owner").exec(function (err, items) {
                    res.json(items);
                });
            }
        });
    }
});

router.get('/all', function (req, res, next) {
    mongoose.model('Channel').find({}, function (err, items) {
        res.json(items);
    });
});

router.post('/join/:name', function (req, res, next) {
    mongoose.model('Channel').findOne({name: req.params.name}, function (err, channel) {
        channel.members.push(req.user);
        channel.save(function (err, item) {
            res.json("Success !");
        });
    });
});

router.post('/post/:name', function (req, res, next) {
    mongoose.model('Channel').findOne({name: req.params.name}, function (err, channel) {
        var isMember = false;

        isMember = channel.members.some(function (member) {
            if (member == req.user.id) {
                return true;
            }
        })
        if (!isMember)
            res.status(401).json({status: 401, message: 'Forbidden : User cannot post if not in channel'});
        else {
            mongoose.model('Message').create({
                channel: channel,
                owner: req.user,
                content: req.body.content
            }, function (err, item) {
                // mongoose.model('User').populate(item, "owner").exec(function() {

                // });
                res.json(item);
            });
        }
    });
});


module.exports = router;
