import jsonServer from 'json-server';

import AuthController from './controllers/auth.controller.mjs';
import replaceUserName from './middleware/username.middleware.mjs';
import passThrough from './middleware/pass-through.middleware.mjs';
import { isAuthenticated } from './middleware/auth.middleware.mjs';

const server = jsonServer.create();
const router = jsonServer.router('db.json');

// Setup middleware
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

// Setup custom routes
server.post('/api/auth/signup', replaceUserName, passThrough);
server.post('/api/auth/login', AuthController.login(router));
server.post('/api/auth/logout', isAuthenticated, AuthController.logout(router));

// Overwrite routes
server.use(
  jsonServer.rewriter({
    '/api/auth/signup': '/api/users',
  })
);

// Fallback to default router
server.use('/api', router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log('JSON Server is running');
});
