import { ORIGIN, PUBLIC_FOLDER } from '../constants.mjs';
import { deleteFile } from '../utils.mjs';

class FridgeController {
  constructor(db) {
    this.db = db;
  }

  createFridge = (req, res) => {
    const id = this.db._.createId(this.db.getState().fridges);

    const imageUrl = req.file?.path.replace(PUBLIC_FOLDER, '');

    const newFridge = {
      id,
      ...req.body,
      imageUrl,
    };

    this.db.setState({
      ...this.db.getState(),
      fridges: [...this.db.getState().fridges, newFridge],
    });
    this.db.write();

    res.status(201).send(newFridge);
  };

  updateFridge = (req, res) => {
    const id = +req.params.fridgeId;

    const fridge = this.db
      .getState()
      .fridges.find((fridge) => fridge.id === id);

    if (!fridge) {
      res.status(404).send({ error: 'Fridge with specified id not found' });
    }

    const prevImageUrl = fridge.imageUrl;

    const imageChanged =
      fridge.imageUrl !== req.body.imageUrl?.replace(ORIGIN, '');

    const imageUrl = imageChanged
      ? req.file?.path.replace(PUBLIC_FOLDER, '') || null
      : fridge.imageUrl;

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

    const updatedFridge = {
      id,
      ...req.body,
      imageUrl,
    };

    this.db.setState({
      ...this.db.getState(),
      fridges: this.db.getState().fridges.map((fridge) => {
        return fridge.id === id ? updatedFridge : fridge;
      }),
    });
    this.db.write();

    res.status(200).send(updatedFridge);
  };

  deleteFridge = (req, res) => {
    const id = +req.params.fridgeId;

    const fridge = this.db
      .getState()
      .fridges.find((fridge) => fridge.id === id);

    if (!fridge) {
      res.status(404).send({ error: 'Fridge with specified id not found' });
    }

    this.db.setState({
      ...this.db.getState(),
      fridges: this.db.getState().fridges.filter((fridge) => {
        return fridge.id !== id;
      }),
    });
    this.db.write();

    res.status(200).send({ id });
  };
}

export default FridgeController;
