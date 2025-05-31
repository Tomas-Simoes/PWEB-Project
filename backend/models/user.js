
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'tech', 'monitor'], default: 'client' },
});
module.exports = model('User', UserSchema);