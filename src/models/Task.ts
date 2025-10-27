// models/Task.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./User";
import Category from "./category";


interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  planned_hours_per_day: number;
  assigned_days: string[];
  completed_hours: number;
  progress_percent: number;
  start_time?: string | null;
  end_time?: string | null;
  userId: number;
  categoryId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TaskCreationAttributes extends Optional<
  TaskAttributes,
  | "id"
  | "description"
  | "completed_hours"
  | "progress_percent"
  | "start_time"
  | "end_time"
  | "categoryId" 
> {}

const Task = sequelize.define<Model<TaskAttributes, TaskCreationAttributes>>(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    planned_hours_per_day: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    assigned_days: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM(
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday"
        )
      ),
      allowNull: false,
    },
    completed_hours: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    progress_percent: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

Task.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

export default Task;
