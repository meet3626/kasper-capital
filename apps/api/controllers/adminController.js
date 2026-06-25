const Admin = require('../models/Admin');
const argon2 = require('argon2');

// @desc    Get all admins
// @route   GET /api/admins
// @access  Private
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).select('-password -mfaSecret');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new admin
// @route   POST /api/admins
// @access  Private (Manage Admins or Master)
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, permissions, isMaster } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Only allow setting isMaster if the current user is a master admin
    // We assume req.admin contains the logged-in admin (from protect middleware)
    let masterFlag = false;
    if (req.admin && req.admin.isMaster && isMaster) {
      masterFlag = true;
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      permissions,
      isMaster: masterFlag
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        permissions: admin.permissions,
        isMaster: admin.isMaster
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update an admin
// @route   PUT /api/admins/:id
// @access  Private
const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Protection logic
    // A normal admin cannot edit a master admin
    if (admin.isMaster && (!req.admin || !req.admin.isMaster)) {
      return res.status(403).json({ message: 'Only a Master Admin can edit a Master Admin' });
    }

    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    
    if (req.body.permissions) {
      admin.permissions = req.body.permissions;
    }

    if (req.body.password) {
      admin.password = req.body.password;
    }

    if (req.admin && req.admin.isMaster && req.body.isMaster !== undefined) {
      // Don't let the primary master (id: 1) remove their own master status?
      // Since it's MongoDB, there is no strict id 1, but we can prevent self-demotion if desired.
      admin.isMaster = req.body.isMaster;
    }

    const updatedAdmin = await admin.save();

    res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      permissions: updatedAdmin.permissions,
      isMaster: updatedAdmin.isMaster
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete an admin
// @route   DELETE /api/admins/:id
// @access  Private
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // A normal admin cannot delete a master admin
    if (admin.isMaster) {
      return res.status(403).json({ message: 'Master Admins cannot be deleted' });
    }

    await admin.deleteOne();
    res.json({ message: 'Admin removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin
};
