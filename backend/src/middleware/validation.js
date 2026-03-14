const { body, validationResult } = require('express-validator');
// Validate email format
const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    throw new Error('Invalid email');
  }
  return true;
};
// Validate password strength (min 6 chars, uppercase, lowercase, number)
const validatePassword = (value) => {
  if (value.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  if (!/[A-Z]/.test(value)) {
    throw new Error('Password must contain uppercase letter');
  }
  if (!/[a-z]/.test(value)) {
    throw new Error('Password must contain lowercase letter');
  }
  if (!/[0-9]/.test(value)) {
    throw new Error('Password must contain number');
  }
  return true;
};
// Validate phone number (10 digits)
const validatePhone = (value) => {
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(value.replace(/\D/g, ''))) {
    throw new Error('Phone must be 10 digits');
  }
  return true;
};

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }
  next();
};

const registerValidation = [
  body('firstName').trim().notEmpty().withMessage('First name required'),
  body('lastName').trim().notEmpty().withMessage('Last name required'),
  body('email').custom(validateEmail),
  body('password').custom(validatePassword),
  body('phone').custom(validatePhone),
  validateRequest
];

const loginValidation = [
  body('email').custom(validateEmail),
  body('password').notEmpty().withMessage('Password required'),
  validateRequest
];

module.exports = {
  registerValidation,
  loginValidation,
  validateEmail,
  validatePassword,
  validatePhone
};
