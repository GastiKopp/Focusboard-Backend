import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const registerUser = async (email: string, password: string, fullName: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    full_name: fullName,
    email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    created_at: user.createdAt,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("El usuario no existe");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "2h" }
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
    },
    token,
  };
};
