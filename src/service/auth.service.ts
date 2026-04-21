import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

interface RegisterParams {
  email: string;
  name: string;
  password: string;
  role: string;
}

export const registerAdmin = async (params: RegisterParams) => {
  const { name, email, password } = params;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("User already Exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      role: "ADMIN",
    },
  });

  return user;
};

interface LoginParams {
  email: string;
  password: string;
}

export const loginUser = async (params: LoginParams) => {
  const { email, password } = params;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid Email");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  const { password: _, ...safeUser } = user;

  return { safeUser, token };
};
