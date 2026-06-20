const express = require('express');
const { generateMfa, verifyMfa } = require('../controllers/mfaController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/generate', protect, generateMfa);
router.post('/verify', protect, verifyMfa);

module.exports = router;
