# 🧠 FocusBoard - Backend

API REST para la aplicación **FocusBoard**, desarrollada en **Node.js**, **Express** y **MongoDB**.

## 🚀 Tecnologías
- Node.js  
- Express  
- MongoDB / Mongoose  
- JWT (autenticación)  
- CORS  
- dotenv  

## ⚙️ Funcionalidades principales
- CRUD de tareas y objetivos personales  
- Autenticación de usuarios con JWT  
- Validación de datos y manejo de errores  
- Estructura modular (routes, controllers, models)

## ▶️ Ejecución local
```bash
npm install
npm start
```

## 📦 Variables de entorno

Crear un archivo .env con:
```bash
PORT=4000
MONGO_URI=tu_conexion_a_mongodb
JWT_SECRET=clave_secreta
```

## 🧭 Endpoints (ejemplos)
POST /api/auth/register

POST /api/auth/login

GET /api/tasks

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id

## 📫 Autor: Gastón Kopplin Alva
