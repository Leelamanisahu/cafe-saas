import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import { AuthUser } from "../types/auth.js";
import { getAdminData } from "../utils/user.js";

interface RegisterParams {
  email: string;
  name: string;
  password: string;
  role: string;
}

export const createStaffService = async (
  Param: RegisterParams,
  admin: AuthUser,
) => {
  const { name, email, password } = Param;

  const adminData = await getAdminData(admin);

  if (!adminData?.cafeId) {
    throw new Error("Admin must create a cafe first");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("User alraedy exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const staff = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      role: "STAFF",
      cafeId: adminData.cafeId,
    },
  });

  return staff;
};

export const getStaffService = async (admin: AuthUser) => {
  const adminData = await getAdminData(admin);
  const staff = await prisma.user.findMany({
    where: {
      cafeId: adminData?.cafeId,
      role: "STAFF",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return staff;
};

export const deleteStaffService = async (staffId: string, admin: AuthUser) => {
  const staff = await prisma.user.findUnique({
    where: { id: staffId },
  });

  const adminData = await getAdminData(admin);

  if (!staff || staff.role !== "STAFF") {
    throw new Error("Staff not Found");
  }

  if (staff.cafeId !== adminData?.cafeId) {
    throw new Error("Unauthorized");
  }

  await prisma.user.delete({
    where: { id: staffId },
  });

  return { message: "Staff deleted successfully" };
};
