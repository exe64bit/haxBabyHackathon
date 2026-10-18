import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // max 300 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after a little rest.',
    errors: ['RATE_LIMIT_EXCEEDED']
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 login/register attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please take a starlight nap and try again later.',
    errors: ['AUTH_RATE_LIMIT_EXCEEDED']
  }
});

export const guestbookLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // max 10 guestbook notes per 10 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Thank you for your enthusiasm! Please wait a few moments before writing another guestbook note.',
    errors: ['GUESTBOOK_RATE_LIMIT_EXCEEDED']
  }
});

