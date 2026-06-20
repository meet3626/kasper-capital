const { z } = require('zod');

// Zod Schema for Login
const loginSchema = z.object({
  emailOrUsername: z.string().min(3, "Username or email is too short").trim(),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

// Middleware to validate request body
const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors.map(e => e.message)
    });
  }
};

module.exports = { validateLogin };
