import { Router } from 'express';
import {
  getDreams,
  getDreamById,
  collectDream,
  getUserCollection
} from '../controllers/dreamController.js';
import { requireAuth } from '../middleware/authenticate.js';
import { checkDatabaseAvailability } from '../config/database.js';

const router = Router();

router.get('/', checkDatabaseAvailability, getDreams);
router.get('/collection', checkDatabaseAvailability, requireAuth, getUserCollection);
router.get('/:id', checkDatabaseAvailability, getDreamById);
router.post('/:id/collect', checkDatabaseAvailability, requireAuth, collectDream);

export default router;

