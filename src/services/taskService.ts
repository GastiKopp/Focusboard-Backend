import Task from "../models/Task";
import Category from "../models/category";
import { calculateProgress } from "../utils/calculateProgress";
import type { Model } from "sequelize";

interface TaskInput {
  title: string;
  description?: string;
  planned_hours_per_day: number;
  assigned_days: string[];
  completed_hours?: number;
  userId: number;
  start_time?: string; // formato: "HH:mm:ss"
  end_time?: string;
  categoryId?: number | null; // acepta null
}

export const createTask = async (data: TaskInput) => {
  const completed = data.completed_hours ?? 0;
  const progress = calculateProgress(
    data.planned_hours_per_day,
    completed,
    data.assigned_days
  );

  const task = await Task.create({
    ...data,
    completed_hours: completed,
    progress_percent: progress,
    start_time: data.start_time ?? null,
    end_time: data.end_time ?? null,
    categoryId: data.categoryId ?? null, // null si no se envía
  });

  return Task.findByPk(task.getDataValue("id"), {
    include: [{ model: Category, as: "category", attributes: ["id", "name", "color"] }],
  });
};

export const updateTask = async (
  userId: number,
  taskId: number,
  data: Partial<TaskInput>
) => {
  const task = (await Task.findOne({ where: { id: taskId, userId } })) as Model & {
    start_time?: string | null;
    end_time?: string | null;
  };
  if (!task) return null;

  const updatedData = {
    ...task.toJSON(),
    ...data,
  };

  const progress = calculateProgress(
    updatedData.planned_hours_per_day,
    updatedData.completed_hours ?? 0,
    updatedData.assigned_days
  );

  await task.update({
    ...data,
    progress_percent: progress,
    start_time: data.start_time ?? task.start_time,
    end_time: data.end_time ?? task.end_time,
    categoryId: Object.prototype.hasOwnProperty.call(data, "categoryId")
      ? data.categoryId // puede ser number o null
      : task.getDataValue("categoryId"),
  });

  return Task.findByPk(taskId, {
    include: [{ model: Category, as: "category", attributes: ["id", "name", "color"] }],
  });
};

export const deleteTask = async (
  userId: number,
  taskId: number
): Promise<boolean> => {
  const task = await Task.findOne({ where: { id: taskId, userId } });
  if (!task) return false;

  await task.destroy();
  return true;
};

export const getTasksByUser = async (userId: number) => {
  return Task.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
    include: [{ model: Category, as: "category", attributes: ["id", "name", "color"] }],
  });
};

export const getTaskById = async (userId: number, taskId: number) => {
  return Task.findOne({
    where: { id: taskId, userId },
    include: [{ model: Category, as: "category", attributes: ["id", "name", "color"] }],
  });
};
