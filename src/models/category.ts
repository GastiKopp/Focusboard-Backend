// src/models/Category.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface CategoryAttributes {
  id: number;
  name: string;
  color: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id"> {}

const Category = sequelize.define<Model<CategoryAttributes, CategoryCreationAttributes>>(
  "Category",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "Categories",
    freezeTableName: true,
    timestamps: true,
  }
);

export default Category;
