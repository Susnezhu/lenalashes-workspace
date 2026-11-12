import { Model, DataTypes } from 'sequelize'
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

import { sequelize } from '../config/database.js'

class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare role: 'admin' | 'employee'
  declare preferredLanguage: 'en' | 'fi' | 'ru'
  declare isActive: CreationOptional<boolean>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM('admin', 'employee'),
      allowNull: false,
    },

    preferredLanguage: {
      type: DataTypes.ENUM('en', 'fi', 'ru'),
      allowNull: false,
      defaultValue: 'fi',
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
)

export default User
