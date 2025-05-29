const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');
const { checkRole } = require('../middlewares/installationMiddleware');

router.post('/installation', checkRole,  installationController.registerInstallation);


module.exports = router;
