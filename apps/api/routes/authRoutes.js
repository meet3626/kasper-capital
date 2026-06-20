const express = require('express');
const { loginAdmin, setupMasterAdmin, logoutAdmin } = require('../controllers/authController');

const { validateLogin } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/login', validateLogin, loginAdmin);
router.post('/setup', setupMasterAdmin);
router.post('/logout', logoutAdmin);

module.exports = router;
