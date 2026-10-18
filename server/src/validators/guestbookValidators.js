import { body } from 'express-validator';
import { sanitizeMultilineText, sanitizeText } from '../utils/sanitize.js';

export const guestbookValidator = [
  body('nickname')
    .trim()
    .customSanitizer(sanitizeText)
    .isLength({ min: 2, max: 40 })
    .withMessage('Nickname must be between 2 and 40 characters long'),

  body('message')
    .trim()
    .customSanitizer(sanitizeMultilineText)
    .isLength({ min: 2, max: 500 })
    .withMessage('Message must be between 2 and 500 characters long'),

  body('sticker')
    .optional()
    .isIn(['star', 'cloud', 'moon', 'rocket', 'heart', 'lantern'])
    .withMessage('Invalid sticker choice')
];

