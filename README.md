# FocusBoard Backend

🧠 API REST + GraphQL para la gestión de usuarios y tareas en la aplicación FocusBoard.

---

## 🚀 Tecnologías

- Node.js + Express
- TypeScript
- PostgreSQL
- Sequelize (ORM)
- JWT para autenticación
- Bcrypt para hash de contraseñas
- GraphQL (opcional)
- CORS + Dotenv

---

## 📦 Instalación local

### 1. Clonar el proyecto

```bash
git clone https://github.com/GastiKopp/focusboard-backend.git
cd focusboard-backend
```
### 2. Instalar dependencias

```bash
npm install
```
### 3. Configurar variables de entorno
Crear un archivo .env en la raíz con el siguiente contenido:
```bash
PORT=4000
DATABASE_URL=postgresql://usuario:password@localhost:5432/focusboard
JWT_SECRET=tu_clave_secreta
```
Cambiá usuario y password según tu configuración local.

### 🗄️ Estructura del proyecto
```bash
src/
├── config/           # conexión a la base de datos
├── controllers/      # lógica de rutas
├── services/         # lógica desacoplada (usuarios, tareas)
├── routes/           # rutas REST
├── middleware/       # autenticación con JWT
├── models/           # definición de modelos Sequelize
├── index.ts          # punto de entrada principal
```

### 🔐 Funcionalidades implementadas
Registro de usuario (nombre completo, email, contraseña)

Login con validación de credenciales

Generación de token JWT válido por 2 horas

Middleware de autenticación para proteger rutas

CRUD de tareas (en desarrollo)

Validaciones básicas de inputs

### 📡 Endpoints principales
Método	Ruta	            Descripción
POST	  /api/auth/signup	Registro de usuario
POST	  /api/auth/login	  Login de usuario
GET	    /api/tasks	      Obtener tareas del usuario
POST	  /api/tasks	      Crear nueva tarea
PUT	    /api/tasks/:id	  Actualizar tarea
DELETE	/api/tasks/:id	  Eliminar tarea

Las rutas de /api/tasks requieren autenticación con JWT.

### 🧪 Scripts disponibles
```bash
npm run dev        # inicia con nodemon
npm run build      # compila a JS en /dist
npm start          # ejecuta dist/index.js
```

### ✍️ Autor
Gastón Kopplin Alva
github.com/GastiKopp
