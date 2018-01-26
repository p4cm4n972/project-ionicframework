const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;


const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

UserSchema.pre('save', true, function (next, done) {
  var user = this;
  if (!user.isModified('password')) return next();

    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
});

UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);
