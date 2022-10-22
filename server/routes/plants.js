import { Router } from 'express';
import { createPlant, getAllPlants, getPlant } from '../controllers/plants.js';

const router = Router();
router.route('/').post(createPlant).get(getAllPlants);
router.route('/:name').get(getPlant);

export default router;
