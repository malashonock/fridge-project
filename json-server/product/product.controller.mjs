class ProductController {
  constructor(db) {
    this.db = db;
  }

  createProduct = (req, res) => {
    const id = this.db._.createId(this.db.getState().products);

    const imageUrl = req.file.path.replace('public', '');

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

  // updateProduct = (req, res) => {};

  // deleteProduct = (req, res) => {};
}

export default ProductController;
