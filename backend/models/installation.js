const mongoose = require('mongoose');

const InstallationSchema = new mongoose.Schema({
  installationAddress: { type: String, required: true },
  nif: { type: Number, required: true },
  phone: { type: String, required: true },
  installDate: { type: Date, required: true },
  panelCount: { type: Number, required: true },
  power: { type: Number, required: true },
  model: { type: String, required: true },
  imagePaths: [String],
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Installation', InstallationSchema);
