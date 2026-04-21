import prisma from "../config/prisma.js";
import { AuthUser } from "../types/auth.js";
import { getAdminData, getUserdata } from "../utils/user.js";

export const createOrderService = async (data: any, user: AuthUser) => {
  const { items, tableNo } = data;

  if (!items || items.length === 0) {
    throw new Error("Order must have items");
  }

  const userData = await getUserdata(user);

  if (!userData) {
    throw new Error("user not found");
  }

  if (!userData.cafeId) {
    throw new Error("Staff not assigned to cafe");
  }

  const menuIds = items.map((i: any) => i.menuId);

  const menus = await prisma.menu.findMany({
    where: {
      id: { in: menuIds },
      cafeId: userData.cafeId,
    },
  });

  const menuMap = new Map(menus.map((m) => [m.id, m]));

  let total = 0;

  const orderItemsData = items.map((item: any) => {
    const menu = menuMap.get(item.menuId);

    if (!menu) {
      throw new Error("Invalid menu item");
    }

    const itemTotal = menu.price * item.quantity;
    total += itemTotal;

    return {
      menuId: menu.id,
      quantity: item.quantity,
      price: menu.price,
      name: menu.name,
    };
  });

  const order = await prisma.order.create({
    data: {
      cafeId: userData.cafeId,
      tableNo,
      total,
      items: {
        create: orderItemsData,
      },
    },
    include: {
      items: true,
    },
  });

  return order;
};

export const getOrdersService = async (user: AuthUser) => {
  const userData = await getUserdata(user);
  return prisma.order.findMany({
    where: {
      cafeId: userData?.cafeId!,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getOrderByIdService = async (id: string, user: AuthUser) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new Error("order not found");
  }

  const userData = await getUserdata(user);

  if (order.cafeId != userData?.cafeId!) {
    throw new Error("unothorized");
  }

  return order;
};

export const updateOrderStatusService = async (
  id: string,
  status: "PENDING" | "PREPARING" | "COMPLETED",
  user: AuthUser,
) => {
  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  const userData = await getUserdata(user);

  if (order.cafeId != userData?.cafeId) {
    throw new Error("Unauthorized");
  }

  return prisma.order.update({
    where: { id },
    data: { status },
  });
};
