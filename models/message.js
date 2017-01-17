var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    content : { type: String, required : true },
    owner : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    channel : {type: mongoose.Schema.Types.ObjectId, ref: "Channel"}
},
{
  timestamps: { createdAt: 'created', updatedAt: 'modified' }
});

module.exports = mongoose.model('Message', MessageSchema);