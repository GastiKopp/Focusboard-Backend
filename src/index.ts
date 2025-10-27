import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models";

import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import categoryRoutes from "./routes/categoryRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("FocusBoard API funcionando 🔥");
});

// Conectar con Sequelize y arrancar el servidor
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conexión con base de datos exitosa");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos:", err);
  });



// ⬇️ al FINAL, después de app.use("/api/..."):
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "INTERNAL_ERROR", detail: err?.message || String(err) });
});
