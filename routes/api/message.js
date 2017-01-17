var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.post('/', function(req, res, next){
    var item = req.body;
    item.owner = req.user;
    mongoose.Model('Message').create(item, function(err, item){
        if(err){
            res.status(400).json({ status : 400, message : 'Bad request', error : err});
            return;
        }else{
            res.json(item);
        }
    });
});

router.get('/', function(req, res , next) {
    mongoose.Model('Message').find({}, function(err, items) {
        res.json(items);
    });
});

module.exports = router;
