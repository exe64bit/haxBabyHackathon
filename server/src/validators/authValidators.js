import { body } from 'express-validator';
import { sanitizeText } from '../utils/sanitize.js';

export const registerValidator = [
  body('nickname')
    .trim()
    .customSanitizer(sanitizeText)
    .isLength({ min: 2, max: 30 })
    .withMessage('Nickname must be between 2 and 30 characters long')
    .matches(/^[a-zA-Z0-9 _-]+$/)
    .withMessage('Nickname can only contain letters, numbers, spaces, underscores, and dashes'),

  body('email')
    .trim()
    .normalizeEmail({ gmail_remove_dots: false })
    .isEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 100 })
    .withMessage('Email address cannot exceed 100 characters'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .isLength({ max: 128 })
    .withMessage('Password cannot exceed 128 characters')
];

export const loginValidator = [
  body('email')
    .trim()
    .normalizeEmail({ gmail_remove_dots: false })
    .isEmail()
    .withMessage('Please provide a valid email address'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

