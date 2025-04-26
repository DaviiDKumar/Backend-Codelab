import Joi from 'joi';

// Validate name (should be between 3 and 30 characters)
export const nameValidation = Joi.string().min(3).max(30).required().messages({
  'string.base': 'Name should be a string.',
  'string.empty': 'Name is required.',
  'string.min': 'Name should have a minimum length of 3 characters.',
  'string.max': 'Name should have a maximum length of 30 characters.',
});

// Validate email (must be a valid email format)
export const emailValidation = Joi.string().email().required().messages({
  'string.base': 'Email should be a string.',
  'string.empty': 'Email is required.',
  'string.email': 'Please enter a valid email address.',
});

// Validate password (must be at least 6 characters and contain at least one uppercase, one lowercase, one number, and one special character)
export const passwordValidation = Joi.string()
  .min(6)
  .max(20)
  .pattern(/(?=.*[A-Z])/, 'uppercase')
  .pattern(/(?=.*[a-z])/, 'lowercase')
  .pattern(/(?=.*[0-9])/, 'digit')
  .pattern(/(?=.*[!@#$%^&*(),.?":{}|<>])/, 'special character')
  .required()
  .messages({
    'string.base': 'Password should be a string.',
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'string.max': 'Password cannot be longer than 20 characters.',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  });
