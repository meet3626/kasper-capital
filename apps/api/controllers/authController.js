const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');
const { generateSecret, generateURI, verifySync } = require('otplib');
const qrcode = require('qrcode');


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
      if (admin.mfaEnabled) {
        return res.json({ requiresMfa: true, adminId: admin._id });
      } else {
        // Enforce 2FA Setup
        const secret = generateSecret();
        const otpauth = generateURI({ issuer: 'AdminPanel', label: admin.email, secret });
        
        admin.mfaSecret = secret;
        await admin.save();
        
        const qrImageUrl = await qrcode.toDataURL(otpauth);
        
        return res.json({ 
          setupMfaRequired: true, 
          adminId: admin._id,
          qrCode: qrImageUrl
        });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login Error:', error);
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
      },
      isMaster: true
    });

    if (admin) {
      generateToken(res, admin._id);
      res.status(201).json({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        permissions: admin.permissions,
        mfaEnabled: admin.mfaEnabled,
        isMaster: admin.isMaster,
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

// @desc    Verify MFA token for login
// @route   POST /api/auth/login-mfa
// @access  Public
const verifyLoginMfa = async (req, res) => {
  try {
    const { adminId, mfaToken } = req.body;

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (!admin.mfaSecret) {
      return res.status(400).json({ message: 'MFA setup is required first' });
    }

    const verification = verifySync({ token: mfaToken, secret: admin.mfaSecret });

    if (verification && verification.valid) {
      if (!admin.mfaEnabled) {
        admin.mfaEnabled = true;
        await admin.save();
      }

      generateToken(res, admin._id);
      res.json({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        permissions: admin.permissions,
        mfaEnabled: admin.mfaEnabled,
        isMaster: admin.isMaster,
      });
    } else {
      res.status(401).json({ message: 'Invalid MFA token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Generate local MFA secret and QR
// @route   POST /api/auth/local-mfa-generate
// @access  Public
const generateLocalMfa = async (req, res) => {
  try {
    const { email } = req.body;
    const secret = generateSecret();
    const otpauth = generateURI({ issuer: 'AdminPanel', label: email, secret });
    const qrImageUrl = await qrcode.toDataURL(otpauth);
    res.json({ secret, qrCode: qrImageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Server error generating MFA' });
  }
};

// @desc    Verify local MFA token
// @route   POST /api/auth/local-mfa-verify
// @access  Public
const verifyLocalMfa = async (req, res) => {
  try {
    const { mfaToken, secret } = req.body;
    const verification = verifySync({ token: mfaToken, secret });
    if (verification && verification.valid) {
      res.json({ success: true });
    } else {
      res.status(401).json({ message: 'Invalid MFA token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error verifying MFA' });
  }
};

module.exports = {
  loginAdmin,
  setupMasterAdmin,
  logoutAdmin,
  verifyLoginMfa,
  generateLocalMfa,
  verifyLocalMfa
};
