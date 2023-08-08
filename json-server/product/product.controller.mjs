import { ORIGIN, PUBLIC_FOLDER } from '../constants.mjs';
import { deleteFile } from '../utils.mjs';

class ProductController {
  constructor(db) {
    this.db = db;
  }

  createProduct = (req, res) => {
    const id = this.db._.createId(this.db.getState().products);

    const imageUrl = req.file.path.replace(PUBLIC_FOLDER, '');

    const newProduct = {
      id,
      ...req.body,
      imageUrl,
    };

    this.db.setState({
      ...this.db.getState(),
      products: [...this.db.getState().products, newProduct],
    });
    this.db.write();

    res.status(201).send(newProduct);
  };

  updateProduct = (req, res) => {
    const id = +req.params.productId;

    const product = this.db
      .getState()
      .products.find((product) => product.id === id);

    if (!product) {
      res.status(404).send({ error: 'Product with specified id not found' });
    }

    const prevImageUrl = product.imageUrl;

    const imageChanged =
      product.imageUrl !== req.body.imageUrl?.replace(ORIGIN, '');

    const imageUrl = imageChanged
      ? req.file?.path.replace(PUBLIC_FOLDER, '') || null
      : product.imageUrl;

    if (!imageChanged && req.file) {
      // Delete the newly uploaded image
      const { path } = req.file;
      deleteFile(path);
    }

    if (imageChanged && prevImageUrl) {
      // Delete the replaced image
      const path = PUBLIC_FOLDER + prevImageUrl;
      deleteFile(path);
    }

    const updatedProduct = {
      id,
      ...req.body,
      imageUrl,
    };

    this.db.setState({
      ...this.db.getState(),
      products: this.db.getState().products.map((product) => {
        return product.id === id ? updatedProduct : product;
      }),
    });
    this.db.write();

    res.status(200).send(updatedProduct);
  };

  // deleteProduct = (req, res) => {};
}

export default ProductController;
