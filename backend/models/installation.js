
const { Schema, model } = require('mongoose');

const InstallationSchema = new Schema({
  installationAddress: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  nif: { type: Number, required: true },
  telemovel: { type: Number, required: true },
  installationDate: { type: Date, required: true },
  quantidade : {type: Number, required: true}, 
  potencia : {type: Number, required: true},
  modelo : {type: String, required: true},
  role:     { type: String, enum: ['client','tech'], default: 'client' },
});


module.exports = model('Installation', InstallationSchema);