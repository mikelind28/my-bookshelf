import { Router } from 'express';

import searchAll from './all.js';
import searchAuthor from './author.js';
import searchAuthors from './authors.js';
// import searchEdition from './edition.js';
import searchISBN from './isbn.js';
import searchTitles from './titles.js';
import searchWork from './work.js';

const searchRouter = Router();

// '/api/open-library/search/...'
searchRouter.get('/', searchAll);
searchRouter.get('/author/:key', searchAuthor);
searchRouter.get('/authors', searchAuthors);
// searchRouter.get('/edition/:key', searchEdition);
searchRouter.get('/isbn/:isbn', searchISBN);
searchRouter.get('/titles', searchTitles);
searchRouter.get('/work/:key', searchWork);

export default searchRouter;