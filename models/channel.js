var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChannelSchema = new Schema({
    name : { type: String, required : true, unique: true },
    topic : { type: String },
    owner : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    members : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
},
{
  timestamps: { createdAt: 'created', updatedAt: 'modified' }
});

module.exports = mongoose.model('Channel', ChannelSchema);