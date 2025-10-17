import express from 'express';
import CarsController from '../controllers/cars.js';

const router = express.Router();

router.get('/cars', CarsController.getCars);
router.get('/cars/:id', CarsController.getCarById)      
router.post('/cars', CarsController.createCar);
//router.delete('/cars/:id', CarsController.deleteCar)    // Not implemented yet
router.patch('/cars/:id', CarsController.updateCar)    

export default router;