import express from 'express';

import AuthController from './auth.controller.mjs';
import { isAuthenticated } from './auth.middleware.mjs';

const authRouter = (db) => {
  const router = express.Router();
  const authController = new AuthController(db);

  return router
    .post('/signup', authController.signup)
    .post('/login', authController.login)
    .post('/logout', isAuthenticated, authController.logout);
};

export default authRouter;
