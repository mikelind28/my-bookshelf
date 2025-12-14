import { Router } from 'express';
import dbRouter from './db/index.js';
import openLibraryRouter from './open-library/index.js';

const router = Router();

// anything that needs to be fetched from the database
router.use('/api/db', dbRouter);

// anything that needs to be fetched from openLibrary's api
router.use('/api/open-library', openLibraryRouter)

export default router;
