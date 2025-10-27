// src/services/categoryService.ts
import Category from "../models/category";

export const getAllCategories = async () => {
  return await Category.findAll();
};

export const getCategoryById = async (id: number) => {
  return await Category.findByPk(id);
};

export const createCategory = async (name: string, color: string) => {
  return await Category.create({ name, color });
};

export const updateCategory = async (
  id: number,
  updates: { name?: string; color?: string }
) => {
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Categoría no encontrada");

  return await category.update(updates);
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  const deleted = await Category.destroy({ where: { id } });
  return deleted > 0;
};

