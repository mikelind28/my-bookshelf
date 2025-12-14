import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

dotenv.config();

// instantiate the server.
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

// import pg, { QueryResult } from 'pg';

// import type { Author, Book } from './types/types';


// // new pool for connecting to my database.
// const { Pool } = pg;


// const pool = new Pool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: 'localhost',
//     database: process.env.DB_NAME,
//     port: 5432,
// });

// async function connectToDatabase() {
//     try {
//         await pool.connect();
//         console.log('Connected to the database.');
//     } catch (err) {
//         console.error('Error connecting to the database:', err);
//     }
// };

// await connectToDatabase();



// // ✅
// app.get('/api/authors', async (_req, res) => {
//     try {
//         const authorsQuery = {
//             text: `SELECT 
// 	                book.id AS book_id,
//                     book.title,
//                     book.subtitle,
//                     book.publication_year,
//                     book.read,
//                     book.owned,
//                     book.publisher_id,
//                     author.id AS author_id,
//                     author.first_name,
//                     author.middle_name,
//                     author.last_name
//                 FROM author
//                 LEFT JOIN author_book
//                 ON author.id = author_book.author_id
//                 LEFT JOIN book
//                 ON author_book.book_id = book.id
//                 ORDER BY author.last_name, author.first_name;`,
//         }

//         const authorsResult: QueryResult = await pool.query(authorsQuery);

//         const authorsMap = new Map();

//         for (const row of authorsResult.rows) {
//             if (!authorsMap.has(row.author_id)) {
//                 authorsMap.set(row.author_id, {
//                     author_id: row.author_id,
//                     first_name: row.first_name,
//                     middle_name: row.middle_name,
//                     last_name: row.last_name,
//                     books: []
//                 });
//             }

//             authorsMap.get(row.author_id).books.push({
//                 book_id: row.book_id,
//                 title: row.title,
//                 subtitle: row.subtitle,
//                 publication_year: row.publication_year,
//                 read: row.read,
//                 owned: row.owned,
//                 publisher_id: row.publisher_id,
//             })
//         }

//         res.json(Array.from(authorsMap.values()));
//     } catch (error) {
//         console.error('error from server at GET /api/authors:', error);
//     }
// });

// app.get('/api/books', async (_req, res) => {
//     try {
//         let baseQuery = `
//             SELECT 
//                 book.id AS book_id,
//                 book.title,
//                 book.subtitle,
//                 book.publication_year,
//                 book.read,
//                 book.owned,
//                 book.publisher_id
//             FROM book
//             ORDER BY book.title, book.subtitle
//         `

//         const bookResult: QueryResult = await pool.query(baseQuery);

//         res.json(bookResult.rows);
//     } catch (error) {
//         console.error('error from server at GET /api/my-books/books:', error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // ✅
// app.get('/api/my-books/books', async (req, res) => {
//     try {
//         // get the query parameters from the request URL, and depending on which ones are received, push different SQL statements into this filters array
//         const filters: string[] = [];

//         if (req.query.read) {
//             if (req.query.read === 'read') {
//                 filters.push(`book.read = true`);
//             } else if (req.query.read === 'not-read') {
//                 filters.push(`book.read = false`);
//             }
//         }

//         let sort: string = '';

//         if (req.query.sort) {
//             if (req.query.sort === 'title') {
//                 sort = ` ORDER BY book.title, book.subtitle`;
//             } else if (req.query.sort === 'publication_year') {
//                 sort = ` ORDER BY book.publication_year`;
//             }
//         }

//         let baseQuery = `
//             SELECT 
//                 book.id AS book_id,
//                 book.title,
//                 book.subtitle,
//                 book.publication_year,
//                 book.read,
//                 book.owned,
//                 book.publisher_id,
//                 author.id AS author_id,
//                 author.first_name,
//                 author.middle_name,
//                 author.last_name
//             FROM book
//             LEFT JOIN author_book
//             ON book.id = author_book.book_id
//             LEFT JOIN author
//             ON author_book.author_id = author.id
//             WHERE book.owned = true
//         `

//         if (filters.length > 0 ) {
//             baseQuery += ' AND ' + filters.join(' AND ');
//         }

//         // if 'sort' was changed to something beyond an empty string, add it to the base query, otherwise, default to sorting by title.
//         if (sort !== '') {
//             baseQuery += sort
//         } else {
//             baseQuery += ` ORDER BY book.title, book.subtitle;`
//         }

//         const bookResult: QueryResult = await pool.query(baseQuery);

//         const booksMap = new Map();

//         for (const row of bookResult.rows) {
//             if (!booksMap.has(row.book_id)) {
//                 booksMap.set(row.book_id, {
//                     book_id: row.book_id,
//                     title: row.title,
//                     subtitle: row.subtitle,
//                     publication_year: row.publication_year,
//                     read: row.read,
//                     owned: row.owned,
//                     publisher_id: row.publisher_id,
//                     authors: []
//                 });
//             }

//             booksMap.get(row.book_id).authors.push({
//                 author_id: row.author_id,
//                 first_name: row.first_name,
//                 middle_name: row.middle_name,
//                 last_name: row.last_name
//             })
//         }

//         res.json(Array.from(booksMap.values()));
//     } catch (error) {
//         console.error('error from server at GET /api/my-books/books:', error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // ✅
// app.get('/api/my-books/books/:bookid', async (req, res) => {
//     const client = await pool.connect();

//     try {
//         await client.query('BEGIN');

//         const bookQuery = {
//             text: `SELECT 
// 	                book.id AS book_id,
//                     book.title,
//                     book.subtitle,
//                     book.publication_year,
//                     book.read,
//                     book.owned,
//                     book.publisher_id
//                 FROM book
//                 WHERE book.id = $1;`,
//             values: [req.params.bookid]
//         }

//         const bookResult: QueryResult = await client.query(bookQuery);

//         if (bookResult.rows.length === 0) {
//             res.status(404).json({ message: "Book not found" });
//         }

//         const authorQuery = {
//             text: `SELECT
//                     author.id AS author_id,
//                     author.first_name,
//                     author.middle_name,
//                     author.last_name
//                 FROM author
//                 JOIN author_book
//                 ON author_book.author_id = author.id
//                 WHERE author_book.book_id = $1;
//                 `,
//             values: [req.params.bookid]
//         }

//         const authorResult: QueryResult = await client.query(authorQuery);

//         const book: Book = {
//             book_id: bookResult.rows[0].book_id,
//             title: bookResult.rows[0].title,
//             subtitle: bookResult.rows[0].subtitle,
//             publication_year: bookResult.rows[0].publication_year,
//             read: bookResult.rows[0].read,
//             owned: bookResult.rows[0].owned,
//             publisher_id: bookResult.rows[0].publisher_id,
//             authors: []
//         };

//         for (const row of authorResult.rows) {
//             book.authors.push(row);
//         }

//         await client.query('COMMIT');
        
//         res.json(book);
//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.error('error from server at GET /api/my-books/books/:book-id:', error);
//         res.status(500).json({ message: "Internal server error" });
//     } finally {
//         client.release();
//     }
// });

// // ✅
// app.put('/api/my-books/books/edit', async (req, res) => {
//     const client = await pool.connect();

//     try {
//         const request = req.body;
        
//         await client.query('BEGIN');

//         const updateBookQuery = {
//             text: `UPDATE book
//                     SET title = $2, subtitle = $3, publication_year = $4, owned = $5, read = $6
//                     WHERE book.id = $1
//                     RETURNING *
//                 `,
//             values: [request.book_id, request.title, request.subtitle, request.publication_year, request.owned, request.read]
//         }

//         await client.query(updateBookQuery);

//         const deleteBooksWithWrongAuthorsQuery = {
//             text: `DELETE FROM author_book
//                 WHERE book_id = $1
//                 AND author_id::TEXT NOT IN ($2)
//                 RETURNING *;
//             `,
//             values: [request.book_id, request.authorIds]
//         }

//         await client.query(deleteBooksWithWrongAuthorsQuery);

//         for (const authorId of request.authorIds) {
//             if (authorId) {
//                 const linkNewAuthorsQuery = {
//                     text: `INSERT INTO author_book (book_id, author_id)
//                     VALUES ($1, $2)
//                     ON CONFLICT (book_id, author_id) DO NOTHING
//                     RETURNING *;
//                     `,
//                     values: [request.book_id, authorId]
//                 }

//                 await client.query(linkNewAuthorsQuery);
//             }
//         }

//         await client.query('COMMIT');

//         res.json({
//             message: 'successfully edited book!'
//         });
//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.error('error from server at PUT /api/my-books/books/edit:', error);
//         res.status(500).json({ error: 'Update failed' });
//     } finally {
//         client.release();
//     }
// });

// // ✅
// app.delete('/api/my-books/books/delete', async (req, res) => {
//     try {
//         const request = req.body;

//         const deleteBookQuery = {
//             text: `DELETE FROM book
//                 WHERE book.id = $1
//                 RETURNING *;
//             `,
//             values: [request.book_id]
//         }

//         const deleteBookResult: QueryResult = await pool.query(deleteBookQuery);

//         res.send({
//             message: 'deleted book',
//             book_id: deleteBookResult.rows[0].id,
//             title: deleteBookResult.rows[0].title,
//             subtitle: deleteBookResult.rows[0].subtitle,
//         });

//         return;
//     } catch (error) {
//         console.error('error from server at DELETE /api/my-books/books/delete:', error);
//     }
// })

// // ✅
// app.post('/api/my-books/books/add-new', async (req, res) => {
//     const client = await pool.connect();

//     try {
//         const request = req.body;
        
//         await client.query('BEGIN');

//         const title = request.title;
//         const subtitle = request.subtitle;
//         const publication_year = request.publication_year;
//         const owned = request.owned;
//         const read = request.read;
//         const authorIds = request.authorIds;

//         let authorIdsSplit = authorIds?.toString().split(',');

//         const addNewBookQuery = {
//             text: `INSERT INTO
//                     book (title, subtitle, publication_year, owned, read)
//                     VALUES ($1, $2, $3, $4, $5)
//                     RETURNING *;
//             `,
//             values: [title, subtitle, publication_year, owned, read]
//         }

//         const addNewBookResult: QueryResult = await client.query(addNewBookQuery);

//         if (authorIds) {
//             for (const authorId of authorIdsSplit) {
//                 const linkAuthorBookQuery = {
//                     text: `INSERT INTO
//                             author_book (author_id, book_id)
//                             VALUES ($1, $2)
//                             RETURNING *;
//                     `,
//                     values: [authorId, addNewBookResult.rows[0].id]
//                 }
    
//                 await client.query(linkAuthorBookQuery);
//             }
//         }
        
//         await client.query('COMMIT');

//         res.send({
//             message: 'added new book',
//             book_id: addNewBookResult.rows[0].id,
//         });
//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.error('error from server at POST /api/my-books/books/add-new:', error);
//         res.status(500).json({ error: 'Add new book failed' });
//     } finally {
//         client.release();
//     }
// });

// // ✅
// app.get('/api/my-books/authors', async (req, res) => {
//     try {
//         // get the query parameters from the request URL, and depending on which ones are received, push different SQL statements into this filters array
//         const filters: string[] = [];

//         if (req.query.read) {
//             if (req.query.read === 'read') {
//                 filters.push(`book.read = true`);
//             } else if (req.query.read === 'not-read') {
//                 filters.push(`book.read = false`);
//             }
//         }

//         let baseQuery = `
//             SELECT 
//                 book.id AS book_id,
//                 book.title,
//                 book.subtitle,
//                 book.publication_year,
//                 book.read,
//                 book.owned,
//                 book.publisher_id,
//                 author.id AS author_id,
//                 author.first_name,
//                 author.middle_name,
//                 author.last_name
//             FROM author
//             LEFT JOIN author_book
//             ON author.id = author_book.author_id
//             LEFT JOIN book
//             ON author_book.book_id = book.id
//             WHERE book.owned = true OR book.owned IS NULL
//         `

//         if (filters.length > 0) {
//             baseQuery += ' AND ' + filters.join(' AND ');
//         }

//         baseQuery += ' ORDER BY author.last_name, author.first_name '

//         const authorsResult: QueryResult = await pool.query(baseQuery);

//         const authorsMap = new Map();

//         for (const row of authorsResult.rows) {
//             if (!authorsMap.has(row.author_id)) {
//                 authorsMap.set(row.author_id, {
//                     author_id: row.author_id,
//                     first_name: row.first_name,
//                     middle_name: row.middle_name,
//                     last_name: row.last_name,
//                     books: []
//                 });
//             }

//             authorsMap.get(row.author_id).books.push({
//                 book_id: row.book_id,
//                 title: row.title,
//                 subtitle: row.subtitle,
//                 publication_year: row.publication_year,
//                 read: row.read,
//                 owned: row.owned,
//                 publisher_id: row.publisher_id,
//             })
//         }

//         res.json(Array.from(authorsMap.values()));
//     } catch (error) {
//         console.error('error from server at GET /api/my-books/authors:', error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // ✅
// app.get('/api/my-books/authors/:authorid', async (req, res) => {
//     const client = await pool.connect();

//     try {
//         await client.query('BEGIN');

//         const authorQuery = {
//             text: `SELECT 
// 	                author.id AS author_id,
//                     author.first_name,
//                     author.middle_name,
//                     author.last_name
//                 FROM author
//                 WHERE author.id = $1;`,
//             values: [req.params.authorid]
//         }

//         const authorResult: QueryResult = await client.query(authorQuery);

//         const bookQuery = {
//             text: `SELECT
// 	                book.id AS book_id,
//                     book.title,
//                     book.subtitle,
//                     book.publication_year,
//                     book.read,
//                     book.owned,
//                     book.publisher_id
//                 FROM book
//                 JOIN author_book
//                 ON book.id = author_book.book_id
//                 WHERE author_book.author_id = $1 AND book.owned = true;
//                 `,
//             values: [req.params.authorid]
//         }

//         const bookResult: QueryResult = await client.query(bookQuery);

//         const author: Author = {
//             author_id: authorResult.rows[0].author_id,
//             first_name: authorResult.rows[0].first_name,
//             middle_name: authorResult.rows[0].middle_name,
//             last_name: authorResult.rows[0].last_name,
//             books: []
//         };

//         for (const row of bookResult.rows) {
//             author.books.push(row);
//         }
        
//         await client.query('COMMIT');

//         res.json(author);
//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.error('error from server at GET /api/my-books/authors/:authorid:', error);
//     } finally {
//         client.release();
//     }
// });

// // ✅
// app.put('/api/my-books/authors/edit', async (req, res) => {
//     const client = await pool.connect();

//     try {
//         const request = req.body;

//         await client.query('BEGIN');

//         const updateAuthorQuery = {
//             text: `UPDATE author
//                     SET first_name = $2, middle_name = $3, last_name = $4
//                     WHERE author.id = $1
//                     RETURNING *
//                 `,
//             values: [request.author_id, request.first_name, request.middle_name, request.last_name]
//         }

//         await client.query(updateAuthorQuery);

//         const deleteAuthorsWithWrongBooksQuery = {
//             text: `DELETE FROM author_book
//                 WHERE author_id = $1
//                 AND book_id::TEXT NOT IN ($2)
//                 RETURNING *;
//             `,
//             values: [request.author_id, request.bookIds]
//         }

//         await client.query(deleteAuthorsWithWrongBooksQuery);

//         for (const bookId of request.bookIds) {
//             if (bookId) {
//                 const linkNewBooksQuery = {
//                     text: `INSERT INTO author_book (author_id, book_id)
//                     VALUES ($1, $2)
//                     ON CONFLICT (author_id, book_id) DO NOTHING
//                     RETURNING *;
//                     `,
//                     values: [request.author_id, bookId]
//                 }

//                 await client.query(linkNewBooksQuery);
//             }
//         }

//         await client.query('COMMIT');

//         res.json({
//             message: 'success!'
//         })
//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.error('error from server at PUT /api/my-books/authors/edit:', error);
//         res.status(500).json({ error: 'Update failed' });
//     } finally {
//         client.release();
//     }
// });

// // ✅
// app.post('/api/my-books/authors/add-new', async (req, res) => {
//     const client = await pool.connect();

//     try {
//         const request = req.body;
        
//         await client.query('BEGIN');

//         const first_name = request.first_name;
//         const middle_name = request.middle_name;
//         const last_name = request.last_name;
//         const bookIds = request.bookIds;

//         let bookIdsSplit = bookIds?.toString().split(',');

//         const addNewAuthorQuery = {
//             text: `INSERT INTO
//                     author (first_name, middle_name, last_name)
//                     VALUES ($1, $2, $3)
//                     RETURNING *;
//             `,
//             values: [first_name, middle_name, last_name]
//         }

//         const addNewAuthorResult: QueryResult = await client.query(addNewAuthorQuery);

//         if (bookIds) {
//             for (const bookId of bookIdsSplit) {
//                 const linkAuthorBookQuery = {
//                     text: `INSERT INTO
//                             author_book (author_id, book_id)
//                             VALUES ($1, $2)
//                             RETURNING *;
//                     `,
//                     values: [addNewAuthorResult.rows[0].id, bookId]
//                 }
    
//                 await client.query(linkAuthorBookQuery);
//             }
//         }

//         await client.query('COMMIT');
        
//         res.send({
//             message: 'added new author',
//             author_id: addNewAuthorResult.rows[0].id,
//         });
//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.error('error from server at POST /api/authors/add-new:', error);
//         res.status(500).json({ error: "Add new author failed" });
//     } finally {
//         client.release();
//     }
// });

// // ✅
// app.delete('/api/my-books/authors/delete', async (req, res) => {
//     try {
//         const request = req.body;

//         const deleteAuthorQuery = {
//             text: `DELETE FROM author
//                 WHERE author.id = $1
//                 RETURNING *;
//             `,
//             values: [request.author_id]
//         }

//         const deleteAuthorResult: QueryResult = await pool.query(deleteAuthorQuery);

//         res.send({
//             message: 'deleted author',
//             author_id: deleteAuthorResult.rows[0].id,
//             first_name: deleteAuthorResult.rows[0].first_name,
//             middle_name: deleteAuthorResult.rows[0].middle_name,
//             last_name: deleteAuthorResult.rows[0].last_name
//         });

//         return;
//     } catch (error) {
//         console.error('error from server at DELETE /api/my-books/authors/delete:', error);
//     }
// });

// // ✅
// app.get('/api/wish-list/books', async (req, res) => {
//     try {
//         let sort: string = '';

//         if (req.query.sort) {
//             if (req.query.sort === 'title') {
//                 sort = ` ORDER BY book.title, book.subtitle`;
//             } else if (req.query.sort === 'publication_year') {
//                 sort = ` ORDER BY book.publication_year`;
//             }
//         }

//         let baseQuery = `
//                 SELECT 
// 	                book.id AS book_id,
//                     book.title,
//                     book.subtitle,
//                     book.publication_year,
//                     book.read,
//                     book.owned,
//                     book.publisher_id,
//                     author.id AS author_id,
//                     author.first_name,
//                     author.middle_name,
//                     author.last_name
//                 FROM book
//                 LEFT JOIN author_book
//                 ON book.id = author_book.book_id
//                 LEFT JOIN author
//                 ON author_book.author_id = author.id
//                 WHERE book.owned = false
//         `

//         // if 'sort' was changed to something beyond an empty string, add it to the base query, otherwise, default to sorting by title.
//         if (sort !== '') {
//             baseQuery += sort
//         } else {
//             baseQuery += ` ORDER BY book.title, book.subtitle;`
//         }

//         const bookResult: QueryResult = await pool.query(baseQuery);

//         const booksMap = new Map();

//         for (const row of bookResult.rows) {
//             if (!booksMap.has(row.book_id)) {
//                 booksMap.set(row.book_id, {
//                     book_id: row.book_id,
//                     title: row.title,
//                     subtitle: row.subtitle,
//                     publication_year: row.publication_year,
//                     read: row.read,
//                     owned: row.owned,
//                     publisher_id: row.publisher_id,
//                     authors: []
//                 });
//             }

//             booksMap.get(row.book_id).authors.push({
//                 author_id: row.author_id,
//                 first_name: row.first_name,
//                 middle_name: row.middle_name,
//                 last_name: row.last_name
//             })
//         }

//         res.json(Array.from(booksMap.values()));
//     } catch (error) {
//         console.error('error from server at GET /api/wish-list:', error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // ✅
// app.get('/api/wish-list/authors', async (req, res) => {
//     try {
//         // get the query parameters from the request URL, and depending on which ones are received, push different SQL statements into this filters array
//         const filters: string[] = [];

//         if (req.query.read) {
//             if (req.query.read === 'read') {
//                 filters.push(`book.read = true`);
//             } else if (req.query.read === 'not-read') {
//                 filters.push(`book.read = false`);
//             }
//         }

//         let baseQuery = `
//             SELECT 
//                 book.id AS book_id,
//                 book.title,
//                 book.subtitle,
//                 book.publication_year,
//                 book.read,
//                 book.owned,
//                 book.publisher_id,
//                 author.id AS author_id,
//                 author.first_name,
//                 author.middle_name,
//                 author.last_name
//             FROM author
//             LEFT JOIN author_book
//             ON author.id = author_book.author_id
//             LEFT JOIN book
//             ON author_book.book_id = book.id
//             WHERE book.owned = false OR book.owned IS NULL
//         `

//         if (filters.length > 0) {
//             baseQuery += ' AND ' + filters.join(' AND ');
//         }

//         baseQuery += ' ORDER BY author.last_name, author.first_name '

//         const authorsResult: QueryResult = await pool.query(baseQuery);

//         const authorsMap = new Map();

//         for (const row of authorsResult.rows) {
//             if (!authorsMap.has(row.author_id)) {
//                 authorsMap.set(row.author_id, {
//                     author_id: row.author_id,
//                     first_name: row.first_name,
//                     middle_name: row.middle_name,
//                     last_name: row.last_name,
//                     books: []
//                 });
//             }

//             authorsMap.get(row.author_id).books.push({
//                 book_id: row.book_id,
//                 title: row.title,
//                 subtitle: row.subtitle,
//                 publication_year: row.publication_year,
//                 read: row.read,
//                 owned: row.owned,
//                 publisher_id: row.publisher_id,
//             })
//         }

//         res.json(Array.from(authorsMap.values()));
//     } catch (error) {
//         console.error('error from server at GET /api/my-books/authors:', error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// app.get('/api/wish-list/authors/:authorid', async (req, res) => {
//     const client = await pool.connect();

//     try {
//         await client.query('BEGIN');

//         const authorQuery = {
//             text: `SELECT 
// 	                author.id AS author_id,
//                     author.first_name,
//                     author.middle_name,
//                     author.last_name
//                 FROM author
//                 WHERE author.id = $1;`,
//             values: [req.params.authorid]
//         }

//         const authorResult: QueryResult = await client.query(authorQuery);

//         const bookQuery = {
//             text: `SELECT
// 	                book.id AS book_id,
//                     book.title,
//                     book.subtitle,
//                     book.publication_year,
//                     book.read,
//                     book.owned,
//                     book.publisher_id
//                 FROM book
//                 JOIN author_book
//                 ON book.id = author_book.book_id
//                 WHERE author_book.author_id = $1 AND book.owned = false;
//                 `,
//             values: [req.params.authorid]
//         }

//         const bookResult: QueryResult = await client.query(bookQuery);

//         const author: Author = {
//             author_id: authorResult.rows[0].author_id,
//             first_name: authorResult.rows[0].first_name,
//             middle_name: authorResult.rows[0].middle_name,
//             last_name: authorResult.rows[0].last_name,
//             books: []
//         };

//         for (const row of bookResult.rows) {
//             author.books.push(row);
//         }
        
//         await client.query('COMMIT');

//         res.json(author);
//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.error('error from server at GET /api/wish-list/authors/:authorid:', error);
//     } finally {
//         client.release();
//     }
// });