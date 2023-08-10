import jsonServer from 'json-server';

import authRouter from './auth/auth.route.mjs';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const { db } = router;

// Setup middleware
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);

// Setup router
server.use('/auth', authRouter(db));
server.use('/', router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log('JSON Server is running');
});
