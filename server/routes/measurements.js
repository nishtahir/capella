import { Router } from 'express';
import { postMeasurement } from '../controllers/measurements.js';

const router = Router();

router.route('/').post(postMeasurement);

export default router;
