import express from 'express';
import WheelsController from '../controllers/wheels.js';

const router = express.Router();

router.get('/wheels', WheelsController.getWheels);
//router.get('/wheels/:id', WheelsController.getExteriorById)       // maybe implement

export default router;