import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class Publisher extends Model<
  InferAttributes<Publisher>,
  InferCreationAttributes<Publisher>
> {
  declare key: CreationOptional<string>;
  declare name: string;
};

export function initializePublisher(sequelize: Sequelize): typeof Publisher {
  Publisher.init(
    {
      key: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'publishers',
    }
  );

  return Publisher;
}