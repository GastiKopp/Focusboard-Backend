import pool from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (email: string, password: string, fullName: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id, email, full_name, created_at",
    [fullName, email, hashedPassword]
  );

  return result.rows[0];
};


export const loginUser = async (email: string, password: string) => {
  const result = await pool.query(
    "SELECT id, email, full_name, password FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];
  if (!user) throw new Error("El usuario no existe");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Contraseña incorrecta");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "2h" }
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name
    },
    token,
  };
};
