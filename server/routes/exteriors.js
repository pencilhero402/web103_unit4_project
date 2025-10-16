import express from 'express';
import ExteriorsController from '../controllers/exteriors.js';

const router = express.Router();

router.get('/exteriors', ExteriorsController.getExteriors);
//router.get('/exteriors/:id', ExteriorsController.getExteriorById)       // maybe implement

export default router;