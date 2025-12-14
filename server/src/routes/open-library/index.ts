import { Router } from 'express';
import searchRouter from './search/index.js';

const openLibraryRouter = Router();

// '/api/open-library/search'
openLibraryRouter.use('/search', searchRouter);

export default openLibraryRouter;
