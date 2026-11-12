import { Model, DataTypes } from 'sequelize'
import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'

import { sequelize } from '../config/database.js'

class UserCredentials extends Model<
  InferAttributes<UserCredentials>,
  InferCreationAttributes<UserCredentials>
> {
  declare id: CreationOptional<number>

  declare userId: number
  declare username: string
  declare passwordHash: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

UserCredentials.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user_credentials',
    timestamps: true,
    underscored: true,

    defaultScope: {
      attributes: {
        exclude: ['passwordHash'],
      },
    },
  },
)

export default UserCredentials