import prisma from "../config/prisma";
import { AuthUser } from "../types/auth";

export const createCafeService = async (
  params: { name: string },
  user: AuthUser,
) => {
  const { name } = params;

  const userData = await prisma.user.findUnique({ where: { id: user.id } });

  if (user.role == "ADMIN" && userData?.cafeId) {
    throw new Error("Admin already has a cafe");
  }

  const result = await prisma.$transaction(async (tx) => {
    const cafe = await tx.cafe.create({
      data: {
        name,
        ownerId: user.id,
      },
    });

    await tx.user.update({
      where: { id: user.id },
      data: {
        cafeId: cafe.id,
      },
    });

    return cafe;
  });

  return result;
};
