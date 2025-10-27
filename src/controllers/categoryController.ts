// src/controllers/categoryController.ts
import type { RequestHandler } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

export const getCategoriesController: RequestHandler = async (_req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) { next(err); }
};

export const getCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const category = await getCategoryById(id);
    if (!category) {
      res.status(404).json({ error: "Categoría no encontrada" });
      return;
    }
    res.json(category);
  } catch (err) { next(err); }
};

// ⬇️ ACA el cambio: solo exige name; color por defecto si no viene o es vacío
export const createCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    if (!name || typeof name !== "string" || !name.trim()) {
      res.status(400).json({ error: "Falta el nombre de la categoría" });
      return;
    }
    const finalColor =
      typeof color === "string" && color.trim() ? color : "#888888";

    const newCategory = await createCategory(name.trim(), finalColor);
    res.status(201).json(newCategory);
  } catch (err) { next(err); }
};

export const updateCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, color } = req.body;
    const updated = await updateCategory(id, { name, color });
    if (!updated) {
      res.status(404).json({ error: "Categoría no encontrada" });
      return;
    }
    res.json(updated);
  } catch (err) { next(err); }
};

export const deleteCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const ok = await deleteCategory(id);
    if (!ok) {
      res.status(404).json({ error: "Categoría no encontrada" });
      return;
    }
    res.status(204).send();
  } catch (err) { next(err); }
};
