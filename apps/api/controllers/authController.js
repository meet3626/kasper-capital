const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    const admin = await Admin.findOne({
      $or: [{ email: emailOrUsername }, { name: emailOrUsername }]
    });

    if (admin && (await admin.matchPassword(password))) {
      generateToken(res, admin._id);
      res.json({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        permissions: admin.permissions,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Register a new admin (Only for seeding Master Admin currently)
// @route   POST /api/auth/setup
// @access  Public (Should be locked down after first run)
const setupMasterAdmin = async (req, res) => {
  try {
    const adminExists = await Admin.countDocuments();
    if (adminExists > 0) {
      return res.status(400).json({ message: 'Master Admin already setup' });
    }

    const admin = await Admin.create({
      name: 'Master Admin',
      email: 'admin@gmail.com',
      password: 'Admin123',
      permissions: {
        dashboard: true,
        users: true,
        newsletter: true,
        settings: true,
        manage_admins: true
      }
    });

    if (admin) {
      generateToken(res, admin._id);
      res.status(201).json({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        permissions: admin.permissions,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Logout admin / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutAdmin = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  loginAdmin,
  setupMasterAdmin,
  logoutAdmin
};
