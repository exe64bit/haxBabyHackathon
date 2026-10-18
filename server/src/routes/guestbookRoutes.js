import { Router } from 'express';
import {
  getGuestbookEntries,
  createGuestbookEntry
} from '../controllers/guestbookController.js';
import { guestbookValidator } from '../validators/guestbookValidators.js';
import { validateRequest } from '../middleware/validate.js';
import { guestbookLimiter } from '../middleware/rateLimiters.js';
import { checkDatabaseAvailability } from '../config/database.js';

const router = Router();

router.get('/', checkDatabaseAvailability, getGuestbookEntries);
router.post(
  '/',
  checkDatabaseAvailability,
  guestbookLimiter,
  guestbookValidator,
  validateRequest,
  createGuestbookEntry
);

export default router;

