const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/login', protect, authController.login);

router.post('/logout', protect, authController.logout);

router.put('/createUser', authController.createTempUser);

module.exports = router;
