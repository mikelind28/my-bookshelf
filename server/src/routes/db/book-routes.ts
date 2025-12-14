import express from 'express';
import { Request, Response } from 'express';
import { Author, Book, Publisher } from "../../models/index.js";

const bookRouter = express.Router();

// GET /api/db/books
export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.findAll({
      order: [
        ['title', 'ASC']
      ]
    });
    
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

bookRouter.get('/', getAllBooks);


// GET at '/api/db/books/owned' retrieves all owned books from the database
export const getOwnedBooks = async (req: Request, res: Response) => {
  try {
    if (req.query.read === 'read') {
      const { count, rows } = await Book.findAndCountAll({
        where: {
          owned: true,
          read: true,
        },
        include: [
          { model: Author },
          { model: Publisher }
        ],
        order: [
          ['title', 'ASC'],
        ],
      });

      res.json({ bookCount: count, rows: rows });
    } else if (req.query.read === 'not-read') {
      const { count, rows } = await Book.findAndCountAll({
        where: {
          owned: true,
          read: false,
        },
        include: [
          { model: Author },
          { model: Publisher }
        ],
        order: [
          ['title', 'ASC'],
        ],
      });
      
      res.json({ bookCount: count, rows: rows });
    } else {
      const { count, rows } = await Book.findAndCountAll({
        where: {
          owned: true,
        },
        include: [
          { model: Author },
          { model: Publisher }
        ],
        order: [
          ['title', 'ASC'],
        ],
      });
      
      res.json({ bookCount: count, rows: rows });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

bookRouter.get('/owned', getOwnedBooks);

// GET at '/api/db/books/wish-list' retrieves all owned books from the database
export const getWishListBooks = async (req: Request, res: Response) => {
  try {
    if (req.query.read === 'read') {
      const { count, rows } = await Book.findAndCountAll({
        where: {
          owned: false,
          read: true,
        },
        include: [
          { model: Author },
          { model: Publisher }
        ],
        order: [
          ['title', 'ASC'],
        ],
      });

      res.json({ bookCount: count, rows: rows });
    } else if (req.query.read === 'not-read') {
      const { count, rows } = await Book.findAndCountAll({
        where: {
          owned: false,
          read: false,
        },
        include: [
          { model: Author },
          { model: Publisher }
        ],
        order: [
          ['title', 'ASC'],
        ],
      });
      
      res.json({ bookCount: count, rows: rows });
    } else {
      const { count, rows } = await Book.findAndCountAll({
        where: {
          owned: false,
        },
        include: [
          { model: Author },
          { model: Publisher }
        ],
        order: [
          ['title', 'ASC'],
        ],
      });
      
      res.json({ bookCount: count, rows: rows });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

bookRouter.get('/wish-list', getWishListBooks);


// GET '/api/db/books/:key' retrieves a single book from the database, as well as all authors, for editing a book
export const getBookAndAllAuthors = async (req: Request, res: Response) => {
  const key = req.params.key;

  try {
    const bookResponse = await Book.findByPk(`/books/${key}`, {
      include: [
        { model: Author },
        { model: Publisher }
      ],
    });
    const allAuthorsResponse = await Author.findAll({
      order: [
        ['last_name', 'ASC']
      ]
    });

    if (!bookResponse) {
      throw new Error(`could not fetch book with key ${key}`);
    }

    if (!allAuthorsResponse) {
      throw new Error(`could not all authors`);
    }
    
    const allAuthors = allAuthorsResponse.map((author) => {
      return author.dataValues;
    })

    res.json({ book: bookResponse.dataValues, allAuthors: allAuthors });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

bookRouter.get('/:key', getBookAndAllAuthors);


// GET '/api/db/books/:key/delete' retrieves a single book from the database
export const getBookByKey = async (req: Request, res: Response) => {
  const key = req.params.key;

  try {
    const bookResponse = await Book.findByPk(`/books/${key}`, {
      include: [
        { model: Author },
        { model: Publisher },
      ],
    });

    if (!bookResponse) {
      throw new Error(`could not fetch book with key ${key}`);
    }

    res.json(bookResponse);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

bookRouter.get('/:key/delete', getBookByKey);


// DELETE '/api/db/books/:key' deletes a single book from the database
export const deleteBook = async (req: Request, res: Response) => {
  const key = req.params.key;

  try {
    const bookResponse = await Book.destroy({
      where: {
        key: `/books/${key}`,
      },
      force: true,
    });

    if (!bookResponse) {
      throw new Error(`could not destroy book with key ${key}`);
    }

    res.json(bookResponse);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

bookRouter.delete('/:key', deleteBook);


// finds further author information from openLibrary, for addNewBook function below
export const findAuthor = async (authorKey: string) => {
  try {
      const response = await fetch(`https://openlibrary.org${authorKey}.json`, {
          headers: {
              'Content-type': 'application/json'
          },
      });
  
      if (!response.ok) {
          throw new Error('could not fetch author from open library at findAuthor(). check network tab');
      }
  
      const author = await response.json();

      let bio: string | undefined;

      if (typeof author.bio === 'string') {
        bio = author.bio;
      } else {
        bio = undefined;
      }

      return {
        key: author.key,
        name: author.name,
        bio: bio,
        birth_date: author.birth_date ?? undefined,
        death_date: author.death_date ?? undefined,
      }
    } catch (error: any) {
      console.error('error from findAuthor():', error);
      return;
    }
}

// POST at '/api/db/books' adds a new book to the database
export const addNewBook = async (req: Request, res: Response) => {
  const request = req.body;

  try {
    const authors = await Promise.all(
      request.authorKeys.map(async (authorKey: string) => {
        const authorResult = await findAuthor(authorKey);

        if (!authorResult) {
          throw new Error(`Author not found for key ${authorKey}`);
        }

        const [author] = await Author.findOrCreate({
          where: { key: authorResult.key},
          defaults: {
            key: authorResult.key,
            name: authorResult.name,
            bio: authorResult.bio,
            birth_date: authorResult.birth_date,
            death_date: authorResult.death_date,
          },
        });

        return author;
      })
    );

    const publishers = await Promise.all(
      request.publishers.map(async (p: string) => {
        const [publisher] = await Publisher.findOrCreate({
          where: { name: p },
          defaults: {
            name: p,
          }
        });
  
        return publisher;
      })
    );

    const book = await Book.findOrCreate({
      where: { key: request.key},
      defaults: {
        title: request.title,
        subtitle: request.subtitle,
        publish_date: request.publication_date,
        owned: request.owned === 'true' ? true : false,
        read: request.read === 'true' ? true : false,
        description: request.description,
        coverUrl: request.coverUrl == '' ? null : request.coverUrl,
        isbn_10: request.isbn_10 == '' ? null : request.isbn_10,
        isbn_13: request.isbn_13 == '' ? null : request.isbn_13,
        key: request.key,
      }
    });

    await book[0].addAuthors(authors);
    await book[0].addPublishers(publishers);

    res.status(201).json({message: 'Book created', book });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

bookRouter.post('/', addNewBook);


// POST at '/api/db/books/new' adds a new book to the database
export const createNewBook = async (req: Request, res: Response) => {
  const request = req.body;

  try {
    const authors = await Promise.all(
      request.authorKeys.map(async (authorKey: string) => {
        const author = await Author.findByPk(authorKey);

        return author;
      })
    );

    const publishers = await Promise.all(
      request.publishers.map(async (p: string) => {
        const [publisher] = await Publisher.findOrCreate({
          where: { name: p },
          defaults: {
            name: p,
          }
        });
  
        return publisher;
      })
    );

    const book = await Book.create({
      title: request.title,
      subtitle: request.subtitle,
      publish_date: request.publication_date,
      owned: request.owned === 'true' ? true : false,
      read: request.read === 'true' ? true : false,
      description: request.description,
      coverUrl: request.coverUrl == '' ? null : request.coverUrl,
      isbn_10: request.isbn_10 == '' ? null : request.isbn_10,
      isbn_13: request.isbn_13 == '' ? null : request.isbn_13
    });

    if (authors?.length) {
      await book.addAuthors(authors);
    }

    if (publishers?.length) {
      await book.addPublishers(publishers);
    }

    res.status(201).json(book);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

bookRouter.post('/new', createNewBook);


// PUT at '/api/db/books' updates an existing book in the database
export const editBook = async (req: Request, res: Response) => {
  const request = req.body;

  try {
    // authors: Author[] = all the authors to include in the book. add all of these authors to book. remove any authors that don't exist in this array. 
    const authors = await Promise.all(
      request.authorKeys.map(async (authorKey: string) => {
        return Author.findByPk(authorKey);
      })
    );

    // const publishers = await Promise.all(
    //   request.publishers.map(async (p: string) => {
    //     const publisher = await Publisher.findByPk();
    // );

    const book = await Book.findByPk(`/books/${request.key}`, {
      include: [
        { model: Author },
      ],
    })

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.update(
      {
        title: request.title,
        subtitle: request.subtitle,
        publish_date: request.publish_date,
        description: request.description,
        coverUrl: request.coverUrl == '' ? null : request.coverUrl,
        isbn_10: request.isbn_10  == '' ? null : request.isbn_10,
        isbn_13: request.isbn_13  == '' ? null : request.isbn_13,
        owned: !!request.owned,
        read: !!request.read,
      },
    );

    const removeAuthors = book.authors
      ?.filter(a => !request.authorKeys.includes(a.key))
      .map(a => book.removeAuthor(a)) ?? [];

    const addAuthors = [
      book.addAuthors(authors.filter(a => a !== null))
    ];

    await Promise.all([...removeAuthors, ...addAuthors]);

    return res.status(201).json({message: 'Book updated', book });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

bookRouter.put('/', editBook);


export default bookRouter;