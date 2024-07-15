import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const createUser = async (username: string) => {
  return await prisma.user.create({
    data: { username },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
