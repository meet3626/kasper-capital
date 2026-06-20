const AuditLog = require('../models/AuditLog');

const logAction = (actionName) => {
  return async (req, res, next) => {
    try {
      if (req.admin) {
        await AuditLog.create({
          adminId: req.admin._id,
          action: actionName,
          endpoint: req.originalUrl,
          ipAddress: req.ip || req.connection.remoteAddress,
          userAgent: req.headers['user-agent']
        });
      }
    } catch (err) {
      console.error('Audit Log Error:', err);
    }
    next();
  };
};

module.exports = { logAction };
