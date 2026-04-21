import prisma from "../config/prisma.js";
import { AuthUser } from "../types/auth.js";
import { getAdminData } from "../utils/user.js";

interface MenuParams {
  name: string;
  price: number | string;
  category: string;
  imageUrl: string;
}

export const createMenuService = async (Param: MenuParams, user: AuthUser) => {
  const { name, price, category, imageUrl } = Param;
  console.log("hit ");
  const adminData = await getAdminData(user);
  if (!adminData?.cafeId) {
    throw new Error("Admin must create a cafe first");
  }

  const menu = await prisma.menu.create({
    data: {
      name,
      price: parseFloat(String(price)),
      category: category.toLowerCase(),
      imageUrl,
      cafeId: adminData.cafeId,
    },
  });
  return menu;
};

export const getMenuService = async (cafeId: string) => {
  return prisma.menu.findMany({
    where: { cafeId },
    orderBy: {
      name: "asc",
    },
  });
};

export const getMenuWithCatService = async (
  cafeId: string,
  category: string,
) => {
  category = category.toLowerCase();
  return prisma.menu.findMany({
    where: { cafeId, category },
    orderBy: {
      name: "asc",
    },
  });
};

export const updateMenuService = async (
  id: string,
  data: MenuParams,
  user: AuthUser,
) => {
  const menu = await prisma.menu.findUnique({
    where: { id },
  });

  if (!menu) {
    throw new Error("Menu not found");
  }

  const adminData = await getAdminData(user);

  if (menu.cafeId !== adminData?.cafeId) {
    throw new Error("Unauthorized");
  }

  return prisma.menu.update({
    where: { id },
    data: {
      ...data,
      price: parseFloat(String(data.price)),
    },
  });
};

export const deleteMenuService = async (id: string, user: AuthUser) => {
  const menu = await prisma.menu.findUnique({
    where: { id },
  });

  if (!menu) {
    throw new Error("Menu not found");
  }

  const adminData = await getAdminData(user);

  if (menu.cafeId !== adminData?.cafeId) {
    throw new Error("Unauthorized");
  }

  await prisma.menu.delete({
    where: { id },
  });

  return { message: "Menu deleted" };
};
