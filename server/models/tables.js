const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  desciption: {
    type: String,
    lowercase: true
  }
})
