import express from 'express';
import InteriorsController from '../controllers/interiors.js';

const router = express.Router();

router.get('/interiors', InteriorsController.getInteriors);
//router.get('/interiors/:id', InteriorsController.getInteriorById)       // maybe implement

export default router;