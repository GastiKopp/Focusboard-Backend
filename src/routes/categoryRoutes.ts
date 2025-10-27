// src/routes/categoryRoutes.ts
import { Router } from "express";
import * as categoryController from "../controllers/categoryController";

const router = Router();

router.get("/",    categoryController.getCategoriesController);
router.get("/:id", categoryController.getCategoryController);
router.post("/",   categoryController.createCategoryController);
router.put("/:id", categoryController.updateCategoryController);
router.delete("/:id", categoryController.deleteCategoryController);

export default router;
