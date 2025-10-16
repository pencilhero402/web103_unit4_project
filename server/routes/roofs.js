import express from 'express';
import RoofsController from '../controllers/roofs.js';

const router = express.Router();

router.get('/roofs', RoofsController.getRoofs);
//router.get('/roofs/:id', roofsController.getExteriorById)       // maybe implement

export default router;