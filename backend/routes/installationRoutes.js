const express = require('express');
const router = express.Router();
const Installation = require('../models/installation');
const User = require('../models/user');
const installationController = require('../controllers/installationController');
const { protect } = require("../middlewares/authMiddleware");
const { checkRole, handleUpload } = require('../middlewares/installationMiddleware');
const { checkTechRole } = require("../middlewares/certificationMiddleware");

router.post('/submit-registration', protect, checkRole, handleUpload, installationController.registerInstallation);

router.get('/', protect, checkTechRole, async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email not provided' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json([]);
    }

    const installations = await Installation.find({ clientId: user._id });
    res.json({ installations, email });
  } catch (err) {
    console.error('Error fetching installations:', err);
    res.status(500).json({ error: 'Internal error fetching installations.' });
  }
});

router.patch('/:id/status', protect, checkTechRole, async (req, res) => {
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const updated = await Installation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Installation not found' });

    res.json({ message: 'Status successfully updated', updated });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ error: 'Internal error updating status' });
  }
});

module.exports = router;
