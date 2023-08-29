import jsonServer from 'json-server';
import multer from 'multer';

import authRouter from './auth/auth.route.mjs';
import productRouter from './product/product.route.mjs';
import { PORT, IMAGES_FOLDER } from './constants.mjs';

const server = jsonServer.create();
const defaultRouter = jsonServer.router('db.json');
const { db } = defaultRouter;
const upload = multer({ dest: IMAGES_FOLDER });

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
server.get('/products', defaultRouter);
server.use('/products', productRouter(db, upload));
server.use('/', defaultRouter);

server.listen(PORT, () => {
  console.log('JSON Server is running');
});
