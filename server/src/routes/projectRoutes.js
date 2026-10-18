import { Router } from 'express';
import { getProjects, getProjectById } from '../controllers/projectController.js';
import { checkDatabaseAvailability } from '../config/database.js';

const router = Router();

router.get('/', checkDatabaseAvailability, getProjects);
router.get('/:id', checkDatabaseAvailability, getProjectById);

export default router;

