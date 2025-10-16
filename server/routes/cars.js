import express from 'express';
import CarsController from '../controllers/cars.js';

const router = express.Router();

router.get('/cars', CarsController.getCars);
router.get('/cars/:id', CarsController.getCarById)      // Not implemented yet
router.post('/cars', CarsController.createCar);
//router.delete('/cars/:id', CarsController.deleteCar)    // Not implemented yet
//router.update('/cars/:id', CarsController.updateCar)    // Not implemented yet

export default router;