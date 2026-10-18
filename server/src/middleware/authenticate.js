import { User } from '../models/User.js';
import { isDatabaseConnected } from '../config/database.js';

export const requireAuth = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      success: false,
      message: 'You need to be logged in to access this dream feature.',
      errors: ['UNAUTHORIZED']
    });
  }

  if (!isDatabaseConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database is currently offline. Authentication cannot be verified.',
      errors: ['DATABASE_UNAVAILABLE']
    });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.session.destroy();
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.',
        errors: ['USER_NOT_FOUND']
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

export const optionalAuth = async (req, res, next) => {
  if (req.session && req.session.userId && isDatabaseConnected()) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        req.user = user;
      }
    } catch {
      // Continue anonymously
    }
  }
  next();
};

