import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const signup = async (req: Request, res: Response) => {
  const { email, password, full_name } = req.body;

  try {
    const newUser = await registerUser(email, password, full_name);
    res.status(201).json({ message: "Usuario registrado", user: newUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user: userData, token } = await loginUser(email, password);
    res
      .status(200)
      .json({ message: "Inicio de sesión exitoso", user: userData, token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
