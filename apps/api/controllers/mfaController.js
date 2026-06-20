const { authenticator } = require('otplib');
const qrcode = require('qrcode');
const Admin = require('../models/Admin');

// @desc    Generate MFA QR Code
// @route   GET /api/mfa/generate
// @access  Private
const generateMfa = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    // Generate unique secret for the user
    const secret = authenticator.generateSecret();
    
    // Create an otpauth uri
    const otpauth = authenticator.keyuri(admin.email, 'AdminPanel', secret);

    // Save the secret to the user temporarily (they must verify to enable)
    admin.mfaSecret = secret;
    await admin.save();

    // Generate QR Code image url
    const qrImageUrl = await qrcode.toDataURL(otpauth);

    res.json({
      secret,
      qrCode: qrImageUrl
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating MFA', error: error.message });
  }
};

// @desc    Verify and Enable MFA
// @route   POST /api/mfa/verify
// @access  Private
const verifyMfa = async (req, res) => {
  try {
    const { token } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (!admin.mfaSecret) {
      return res.status(400).json({ message: 'MFA not initialized' });
    }

    const isValid = authenticator.verify({ token, secret: admin.mfaSecret });

    if (isValid) {
      admin.mfaEnabled = true;
      await admin.save();
      res.json({ message: 'MFA Enabled Successfully' });
    } else {
      res.status(400).json({ message: 'Invalid MFA Token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { generateMfa, verifyMfa };
