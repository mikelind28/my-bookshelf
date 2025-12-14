import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { initalizeAuthor } from './author.js';
import { initializeBook } from './book.js';
import { initializePublisher } from './publisher.js';

dotenv.config();

// create a Sequelize instance in order to connect to the database. if a DB_URL environment variable exists, use it, otherwise connect to the database with the provided name/user/password.
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

const Book = initializeBook(sequelize);
const Author = initalizeAuthor(sequelize);
const Publisher = initializePublisher(sequelize);

Book.belongsToMany(Author, { through: 'author_books' });
Author.belongsToMany(Book, { through: 'author_books' });

Book.belongsToMany(Publisher, { through: 'publisher_books' });
Publisher.belongsToMany(Book, { through: 'publisher_books' });

export { sequelize, Book, Author, Publisher };