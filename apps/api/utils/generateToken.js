const jwt = require('jsonwebtoken');

const generateToken = (res, adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET || 'super_secret_jwt_key_12345', {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true, // Must be true for sameSite: 'none'
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

module.exports = generateToken;
