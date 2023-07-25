import jsonServer from 'json-server';

import authRouter from './auth/auth.route.mjs';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const { db } = router;

// Setup middleware
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

// Setup router
server.use('/api/auth', authRouter(db));
server.use('/api', router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log('JSON Server is running');
});
