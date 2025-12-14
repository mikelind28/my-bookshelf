import { Router } from 'express';
import homeRouter from './home-route.js';
import bookRouter from './book-routes.js';
import authorRouter from './author-routes.js';

const dbRouter = Router();

// '/api/db/home'
dbRouter.use('/home', homeRouter);

// '/api/db/books'
dbRouter.use('/books', bookRouter);

// '/api/db/authors'
dbRouter.use('/authors', authorRouter);

export default dbRouter;
