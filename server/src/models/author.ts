import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize, BelongsToManyAddAssociationMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyAddAssociationsMixin, CreationOptional } from "sequelize";
import { Book } from "./book";

export class Author extends Model<
  InferAttributes<Author>,
  InferCreationAttributes<Author, { omit: 'books' }>
> {
  declare key: CreationOptional<string>;
  declare name: string | undefined;
  declare bio: string | undefined;
  declare birth_date: string | undefined;
  declare death_date: string | undefined;
  declare image_url: string | undefined;

  declare books?: Book[];

  declare last_name: string | undefined;

  declare addBook: BelongsToManyAddAssociationMixin<Book, string>;
  declare addBooks: BelongsToManyAddAssociationsMixin<Book, string>;

  declare removeBook: BelongsToManyRemoveAssociationMixin<Book, string>;
};

export function initalizeAuthor(sequelize: Sequelize): typeof Author {
  Author.init(
    {
      key: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue() {
          return `/authors/${crypto.randomUUID()}`;
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio:  DataTypes.TEXT,
      birth_date: DataTypes.STRING,
      death_date: DataTypes.STRING,
      image_url: DataTypes.STRING,
      last_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'authors',
      hooks: {
        beforeSave(author) {
          if (author.name && !author.last_name) {
            const trimmed = author.name.trim();
            const lastSpaceIndex = trimmed.lastIndexOf(` `);
            author.last_name =
              lastSpaceIndex !== -1
                ? trimmed.substring(lastSpaceIndex + 1)
                : trimmed;
          }
        }
      }
    },
  );

  return Author;
}