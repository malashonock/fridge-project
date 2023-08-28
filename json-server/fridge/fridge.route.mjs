import express from 'express';

import FridgeController from './fridge.controller.mjs';
import { bodyParser } from '../middleware/multipart.middleware.mjs';

const fridgeRouter = (db, upload) => {
  const router = express.Router();
  const fridgeController = new FridgeController(db);

  return router
    .post(
      '/',
      upload.single('image'),
      bodyParser,
      fridgeController.createFridge
    )
    .put(
      '/:fridgeId',
      upload.single('image'),
      bodyParser,
      fridgeController.updateFridge
    )
    .delete('/:fridgeId', fridgeController.deleteFridge);
};

export default fridgeRouter;
