import { Request, Response } from "express";
import * as taskService from "../services/taskService";

const normalizeCategoryId = (raw: unknown): number | null | undefined => {
  // undefined => no actualizar / no enviar
  if (raw === undefined) return undefined;
  // "" ó null => null en DB
  if (raw === "" || raw === null) return null;
  const n = Number(raw);
  return Number.isNaN(n) ? null : n;
};

const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === "string");

const taskController = {
  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      let {
        title,
        description,
        planned_hours_per_day,
        assigned_days,
        completed_hours,
        start_time,
        end_time,
        categoryId,
      } = req.body;

      // Normalizaciones
      planned_hours_per_day = Number(planned_hours_per_day);
      completed_hours = completed_hours !== undefined ? Number(completed_hours) : 0;
      const normalizedCategoryId = normalizeCategoryId(categoryId);

      // Validaciones mínimas
      if (!title || typeof title !== "string") {
        res.status(400).json({ error: "Título es obligatorio" });
        return;
      }
      if (!Number.isFinite(planned_hours_per_day) || planned_hours_per_day <= 0) {
        res.status(400).json({ error: "planned_hours_per_day debe ser un número > 0" });
        return;
      }
      if (!isStringArray(assigned_days) || assigned_days.length === 0) {
        res.status(400).json({ error: "assigned_days debe ser un array de strings no vacío" });
        return;
      }

      const task = await taskService.createTask({
        title,
        description,
        planned_hours_per_day,
        assigned_days,
        completed_hours,
        userId,
        start_time,
        end_time,
        categoryId: normalizedCategoryId,
      });

      res.status(201).json(task);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      res.status(500).json({ error: "Error al crear la tarea" });
    }
  },

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      const tasks = await taskService.getTasksByUser(userId);
      res.json(tasks);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      res.status(500).json({ error: "Error al obtener las tareas" });
    }
  },

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const taskId = Number(req.params.id);
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }
      if (!Number.isFinite(taskId)) {
        res.status(400).json({ error: "ID de tarea inválido" });
        return;
      }

      // Whitelist de campos editables
      const {
        title,
        description,
        planned_hours_per_day,
        assigned_days,
        completed_hours,
        start_time,
        end_time,
        categoryId,
      } = req.body;

      const updates: any = {};

      if (title !== undefined) {
        if (!title || typeof title !== "string") {
          res.status(400).json({ error: "Título inválido" });
          return;
        }
        updates.title = title;
      }

      if (description !== undefined) updates.description = description;

      if (planned_hours_per_day !== undefined) {
        const n = Number(planned_hours_per_day);
        if (!Number.isFinite(n) || n <= 0) {
          res.status(400).json({ error: "planned_hours_per_day inválido" });
          return;
        }
        updates.planned_hours_per_day = n;
      }

      if (assigned_days !== undefined) {
        if (!isStringArray(assigned_days) || assigned_days.length === 0) {
          res.status(400).json({ error: "assigned_days inválido" });
          return;
        }
        updates.assigned_days = assigned_days;
      }

      if (completed_hours !== undefined) {
        const n = Number(completed_hours);
        if (!Number.isFinite(n) || n < 0) {
          res.status(400).json({ error: "completed_hours inválido" });
          return;
        }
        updates.completed_hours = n;
      }

      if (start_time !== undefined) updates.start_time = start_time;
      if (end_time !== undefined) updates.end_time = end_time;

      if ("categoryId" in req.body) {
        updates.categoryId = normalizeCategoryId(categoryId); // puede ser number o null
      }

      const updated = await taskService.updateTask(userId, taskId, updates);
      if (!updated) {
        res.status(404).json({ error: "Tarea no encontrada o no autorizada" });
        return;
      }

      res.json(updated);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      res.status(500).json({ error: "Error al actualizar la tarea" });
    }
  },

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const taskId = Number(req.params.id);

      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }
      if (!Number.isFinite(taskId)) {
        res.status(400).json({ error: "ID de tarea inválido" });
        return;
      }

      const deleted = await taskService.deleteTask(userId, taskId);
      if (!deleted) {
        res.status(404).json({ error: "Tarea no encontrada o no autorizada" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      res.status(500).json({ error: "Error al eliminar la tarea" });
    }
  },

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const taskId = Number(req.params.id);
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }
      if (!Number.isFinite(taskId)) {
        res.status(400).json({ error: "ID de tarea inválido" });
        return;
      }

      const task = await taskService.getTaskById(userId, taskId);
      if (!task) {
        res.status(404).json({ message: "Tarea no encontrada" });
        return;
      }

      res.json(task);
    } catch (error) {
      console.error("Error al obtener la tarea:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};

export default taskController;
