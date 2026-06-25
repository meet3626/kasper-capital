const express = require('express');
const { loginAdmin, setupMasterAdmin, logoutAdmin, verifyLoginMfa, generateLocalMfa, verifyLocalMfa } = require('../controllers/authController');

const { validateLogin } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/login', validateLogin, loginAdmin);
router.post('/setup', setupMasterAdmin);
router.post('/logout', logoutAdmin);
router.post('/login-mfa', verifyLoginMfa);
router.post('/local-mfa-generate', generateLocalMfa);
router.post('/local-mfa-verify', verifyLocalMfa);

module.exports = router;
