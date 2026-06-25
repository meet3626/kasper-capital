const express = require('express');
const { getAdmins, createAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Require valid JWT token for all these routes
router.use(protect);

router.route('/')
  .get(getAdmins)
  .post(createAdmin);

router.route('/:id')
  .put(updateAdmin)
  .delete(deleteAdmin);

module.exports = router;
