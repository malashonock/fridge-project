import express from 'express';

import ProductController from './product.controller.mjs';
import { bodyParser } from '../middleware/multipart.middleware.mjs';

const productRouter = (db, upload) => {
  const router = express.Router();
  const productController = new ProductController(db);

  return router
    .post(
      '/',
      upload.single('image'),
      bodyParser,
      productController.createProduct
    )
    .put(
      '/:productId',
      upload.single('image'),
      bodyParser,
      productController.updateProduct
    );
  // .delete('/:productId', productController.deleteProduct);
};

export default productRouter;
