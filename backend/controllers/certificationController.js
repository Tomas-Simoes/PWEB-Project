const Certification = require('../models/certification');
const User = require('../models/user');

exports.registerCertification = async (req, res) => {
  try {
    const { userMail } = req.body;

    const user = await User.findOne({ email: userMail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cert = new Certification({
      userId: user._id,
      filePath: req.file.path
    });

    await cert.save();
    res.status(200).json({ message: 'Certificate successfully registered!' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering certificate.', details: err.message });
  }
};

exports.hasCertificate = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ exists: false });

    const certExists = await Certification.exists({ userId: user._id });
    return res.json({ exists: !!certExists });
  } catch (err) {
    return res.status(500).json({ error: 'Error checking certificate.' });
  }
};
