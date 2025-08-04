import { Router } from "express";
import { signup, login } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", signup);
router.post("/login", login);

// ✅ Ruta protegida de ejemplo
router.get("/perfil", authenticateToken, (req, res) => {
  const user = (req as any).user;
  res.json({ mensaje: "Acceso permitido", usuario: user });
});

export default router;
