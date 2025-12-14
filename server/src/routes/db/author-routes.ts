import { Request, Response, Router } from 'express';
import { Author, Book } from "../../models/index.js";

// GET /api/db/authors
// gets all authors from the database
export const getAllAuthors = async (_req: Request, res: Response) => {
  try {
    const authors = await Author.findAll({
      order: [
        ['last_name', 'ASC']
      ]
    });
    
    res.json(authors);
  } catch (error: any) {
    console.error(error);
  }
};

// GET /api/db/authors/owned
// gets all owned authors from the database
export const getOwnedAuthors = async (req: Request, res: Response) => {
  try {
    if (req.query.read === 'read') {
      const { count, rows } = await Author.findAndCountAll({
        include: [
          { 
            model: Book, 
            required: true, 
            where: { owned: true, read: true } 
          }
        ],
        order: [
          ['last_name', 'ASC']
        ]
      });

      res.json({ authorCount: count, rows: rows });

    } else if (req.query.read === 'not-read') {
      const { count, rows } = await Author.findAndCountAll({
        include: [
          { 
            model: Book, 
            required: true, 
            where: { owned: true, read: false } 
          }
        ],
        order: [
          ['last_name', 'ASC']
        ]
      });

      res.json({ authorCount: count, rows: rows });
      
    } else {
      const { count, rows } = await Author.findAndCountAll({
        include: [
          { 
            model: Book, 
            required: true, 
            where: { owned: true } 
          }
        ],
        order: [
          ['last_name', 'ASC']
        ]
      });
      
      res.json({ authorCount: count, rows: rows });
    }
  } catch (error) {
    console.error(error);
  }
};

// GET /api/db/authors/wish-list
// gets all unowned authors from the database
export const getWishListAuthors = async (req: Request, res: Response) => {
  try {
    if (req.query.read === 'read') {
      const { count, rows } = await Author.findAndCountAll({
        include: [
          { 
            model: Book, 
            required: true, 
            where: { owned: false, read: true } 
          }
        ],
        order: [
          ['last_name', 'ASC']
        ],
      });

      res.json({ authorCount: count, rows: rows });

    } else if (req.query.read === 'not-read') {
      const { count, rows } = await Author.findAndCountAll({
        include: [
          { 
            model: Book, 
            required: true, 
            where: { owned: false, read: false } 
          }
        ],
        order: [
          ['last_name', 'ASC']
        ],
      });

      res.json({ authorCount: count, rows: rows });
      
    } else {
      const { count, rows } = await Author.findAndCountAll({
        include: [
          { 
            model: Book, 
            required: true, 
            where: { owned: false } 
          }
        ],
        order: [
          ['last_name', 'ASC']
        ],
      });
      
      res.json({ authorCount: count, rows: rows });
    }
  } catch (error) {
    console.error(error);
  }
};

// POST /api/db/authors
// creates a new author from an openLibrary author record
export const addNewAuthor = async (req: Request, res: Response) => {
  const request = req.body;

  try {
    const author = await Author.findOrCreate({
      where: { key: request.key},
      defaults: {
        name: request.name,
        birth_date: request.birthDate,
        death_date: request.deathDate,
        bio: request.bio,
        image_url: request.imageUrl,
        key: request.key,
      }
    });

    res.status(201).json({message: 'Author created', author });
  } catch (error) {
    console.error(error);
  }
};

// POST at '/api/db/authors/new' 
// adds a brand new, user-defined author to the database
export const createNewAuthor = async (req: Request, res: Response) => {
  const request = req.body;

  try {
    const books = await Promise.all(
      request.bookKeys.map(async (bookKey: string) => {
        const book = await Book.findByPk(bookKey);
        return book;
      })
    );

    const first_name = request.first_name;
    const middle_name = request.middle_name;
    const last_name = request.last_name;
    const bio = request.bio;
    const birth_date = request.birth_date;
    const death_date = request.death_date;
    const image_url = request.image_url;

    const name = [first_name, middle_name, last_name]
      .filter(Boolean)
      .join(' ');

    const author = await Author.create({
        name: name ?? undefined,
        bio: bio ?? undefined,
        birth_date: birth_date ?? undefined,
        death_date: death_date ?? undefined,
        image_url: image_url ?? undefined,
        last_name: last_name ?? undefined,
    });

    if (books.length > 0) {
      await author.addBooks(books);
      const authorWithBooks = await author.reload({ include: [Book] });
      res.status(201).json(authorWithBooks);
    } else {
      res.status(201).json(author);
    }

  } catch (error) {
    console.error(error);
  }
};

// GET '/api/db/authors/:key' 
// retrieves a single author from the database, as well as all books, for editing a author
export const getAuthorAndAllBooks = async (req: Request, res: Response) => {
  const key = req.params.key;

  try {
    const authorResponse = await Author.findByPk(`/authors/${key}`, {
      include: [
        { model: Book },
      ],
    });

    const allBooksResponse = await Book.findAll({
      order: [
        ['title', 'ASC']
      ]
    });

    if (!authorResponse) {
      throw new Error(`could not fetch author with key ${key}`);
    }

    if (!allBooksResponse) {
      throw new Error(`could not fetch all books`);
    }
    
    const allBooks = allBooksResponse.map((book) => {
      return book.dataValues;
    })

    res.json({ author: authorResponse.dataValues, allBooks: allBooks });
  } catch (error) {
    console.error(error);
  }
};

// PUT at '/api/db/authors' 
// updates an existing author in the database
export const editAuthor = async (req: Request, res: Response) => {
  const request = req.body;

  try {
    // books: EditionType[] = all the books to include in the author. add all of these books to author. remove any books that don't exist in this array. 
    const books = await Promise.all(
      request.bookKeys.map(async (bookKey: string) => {
        return Book.findByPk(bookKey);
      })
    );

    const author = await Author.findByPk(`/authors/${request.key}`, {
      include: [
        { model: Book },
      ],
    })

    if (!author) {
      throw new Error('author not found from editAuthor()');
    }

    await author.update(
      {
        name: request.name,
        birth_date: request.birth_date,
        death_date: request.death_date,
        bio: request.bio,
        image_url: request.image_url === '' ? null : request.image_url,
      },
    );

    const removeBooks = author.books
      ?.filter(b => !request.bookKeys.includes(b.key))
      .map(b => author.removeBook(b)) ?? [];

    const addBooks = [
      author.addBooks(books.filter(b => b !== null))
    ];

    await Promise.all([...removeBooks, ...addBooks]);

    res.status(201).json({message: 'Author updated', author });
  } catch (error) {
    console.error(error);
  }
};

// GET '/api/db/authors/:key/delete' 
// retrieves a single author from the database
export const getAuthorByKey = async (req: Request, res: Response) => {
  const key = req.params.key;

  try {
    const authorResponse = await Author.findByPk(`/authors/${key}`);

    if (!authorResponse) {
      throw new Error(`could not fetch author with key ${key}`);
    }

    res.json(authorResponse);
  } catch (error: any) {
    console.error(error);
  }
};

// DELETE '/api/db/authors/:key' 
// deletes a single author from the database
export const deleteAuthor = async (req: Request, res: Response) => {
  const key = req.params.key;

  try {
    const authorResponse = await Author.destroy({
      where: {
        key: `/authors/${key}`,
      },
      force: true,
    });

    if (!authorResponse) {
      throw new Error(`could not destroy author with key ${key}`);
    }

    res.json(authorResponse);
  } catch (error) {
    console.error(error);
  }
};


const authorRouter = Router();

authorRouter.get('/', getAllAuthors);
authorRouter.post('/', addNewAuthor);
authorRouter.put('/', editAuthor);
authorRouter.get('/:key', getAuthorAndAllBooks);
authorRouter.delete('/:key', deleteAuthor);
authorRouter.get('/:key/delete', getAuthorByKey);
authorRouter.post('/new', createNewAuthor);
authorRouter.get('/owned', getOwnedAuthors);
authorRouter.get('/wish-list', getWishListAuthors);

export default authorRouter;