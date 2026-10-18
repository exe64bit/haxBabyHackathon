import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../validators/authValidators.js';
import { validateRequest } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiters.js';
import { checkDatabaseAvailability } from '../config/database.js';

const router = Router();

router.post(
  '/register',
  checkDatabaseAvailability,
  authLimiter,
  registerValidator,
  validateRequest,
  register
);

router.post(
  '/login',
  checkDatabaseAvailability,
  authLimiter,
  loginValidator,
  validateRequest,
  login
);

router.post('/logout', logout);

router.get('/me', getMe);

export default router;

