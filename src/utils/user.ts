import prisma from "../config/prisma.js";
import { AuthUser } from "../types/auth.js";

export const getAdminData = async (admin: AuthUser) => {
  const adminData = await prisma.user.findUnique({ where: { id: admin.id } });
  return adminData;
};
export const getUserdata = async (user: AuthUser) => {
  const userData = await prisma.user.findUnique({ where: { id: user.id } });
  return userData;
};
