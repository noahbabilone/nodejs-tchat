var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passport_local_mongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    nom : { type: String },
    prenom :{ type: String },
    email : { type: String},
    password : { type: String },
    username : { type: String, unique: true, required: true }

},
{
  timestamps: { createdAt: 'created', updatedAt: 'modified' }
});

UserSchema.plugin(passport_local_mongoose);

module.exports = mongoose.model('User', UserSchema);