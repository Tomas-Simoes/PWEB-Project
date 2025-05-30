const express = require('express');
const router = express.Router();
const controller = require('../controllers/certificationController');
const { handleCertUpload, checkTechRole } = require('../middlewares/certificationMiddleware');
const { protect } = require('../middlewares/authMiddleware');

router.post(
  '/register',
  protect,
  checkTechRole,
  handleCertUpload,
  controller.registerCertification
);

router.get(
  '/check',
  protect,
  checkTechRole,
  controller.hasCertificate
);


module.exports = router;