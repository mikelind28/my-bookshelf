import { Model, InferAttributes, InferCreationAttributes, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, DataTypes, Sequelize, BelongsToManyRemoveAssociationMixin, CreationOptional } from "sequelize";
import { Author } from './author.js';
import { Publisher } from "./publisher.js";

export class Book extends Model<
  InferAttributes<Book>, 
  InferCreationAttributes<Book, { omit: 'authors' }>
> {
  declare key: CreationOptional<string>;
  declare title: string;
  declare subtitle: string | undefined;
  declare isbn_13: string | undefined;
  declare isbn_10: string | undefined;
  declare publish_date: string | undefined;
  declare description: string | undefined;
  declare coverUrl: string | undefined;
  declare owned: boolean;
  declare read: boolean;

  declare authors?: Author[];

  declare addAuthor: BelongsToManyAddAssociationMixin<Author, string>;
  declare addAuthors: BelongsToManyAddAssociationsMixin<Author, string>;
  declare removeAuthor: BelongsToManyRemoveAssociationMixin<Author, string>;
  declare addPublisher: BelongsToManyAddAssociationMixin<Publisher, string>;
  declare addPublishers: BelongsToManyAddAssociationsMixin<Publisher, string>;
};

export function initializeBook(sequelize: Sequelize): typeof Book {
  Book.init(
    {
      key: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue() {
          return `/books/${crypto.randomUUID()}`;
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle: DataTypes.STRING,
      isbn_13: {
        type: DataTypes.STRING,
        unique: true,
      },
      isbn_10: {
        type: DataTypes.STRING,
        unique: true,
      },
      publish_date: DataTypes.STRING,
      description: DataTypes.TEXT,
      coverUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      owned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'books',
    },
  );

  return Book;
}