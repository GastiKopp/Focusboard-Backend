import sequelize from "../config/db";
import User from "./User";
import Task from "./Task";

User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

export { sequelize, User, Task };
