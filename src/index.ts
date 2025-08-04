import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// importamos y usamos las rutas
import authRoutes from "./routes/authRoutes";
app.use("/api/auth", authRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("FocusBoard API funcionando 🔥");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Verificar conexión a DB
pool.query("SELECT NOW()")
  .then(res => console.log("✅ Conectado a PostgreSQL:", res.rows[0]))
  .catch(err => console.error("❌ Error al conectar a PostgreSQL:", err));
