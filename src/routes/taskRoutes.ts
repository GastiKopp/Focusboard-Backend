import { Router } from "express";
import taskController from "../controllers/taskController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Todas estas rutas requieren autenticación
router.post("/", authenticateToken, taskController.createTask);
router.get("/", authenticateToken, taskController.getTasks);
router.get("/:id", authenticateToken, taskController.getTaskById);
router.put("/:id", authenticateToken, taskController.updateTask);
router.delete("/:id", authenticateToken, taskController.deleteTask);

export default router;
