import { Router, Request, Response } from 'express';
import dbRouter from './db/index.js';
import openLibraryRouter from './open-library/index.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// anything that needs to be fetched from the database
router.use('/db', dbRouter);

// anything that needs to be fetched from openLibrary's api
router.use('/open-library', openLibraryRouter);

// serve up react front-end in production
if (process.env.NODE_ENV === 'production') {
  router.use((_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
}

export default router;
