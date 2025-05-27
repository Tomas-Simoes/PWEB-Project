
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  userCode: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
module.exports = model('User', UserSchema);