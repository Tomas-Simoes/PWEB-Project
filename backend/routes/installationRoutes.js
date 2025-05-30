const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');
const upload = require('../middlewares/upload');
const { checkRole } = require('../middlewares/installationMiddleware');

router.post('/submit-registration', checkRole, handleUpload, installationController.registerInstallation);


function handleUpload(req, res, next) {
    upload.array('imagens[]')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ erro: err.message });
      }
      next();
    });
  }

module.exports = router;
