import { Router } from 'express';
import { getVisitorStats } from '../controllers/visitorController.js';

const router = Router();

router.get('/', getVisitorStats);

export default router;

