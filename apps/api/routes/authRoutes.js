const express = require('express');
const { loginAdmin, setupMasterAdmin, logoutAdmin, verifyLoginMfa } = require('../controllers/authController');

const { validateLogin } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/login', validateLogin, loginAdmin);
router.post('/setup', setupMasterAdmin);
router.post('/logout', logoutAdmin);
router.post('/login-mfa', verifyLoginMfa);

module.exports = router;
