var mongoose = require('mongoose');
var Shema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserShema = new Schema({
  title: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

UserShema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) { 
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else { return next();}
})
