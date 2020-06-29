const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: String,
  password: String,
  level: String,
}, {
  toJSON: { virtuals: true }
});

UserSchema.virtual('userId').get(function() {
  return this._id;
});

module.exports = UserSchema;
