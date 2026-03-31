import prisma from "../lib/prisma";

export const getAllRoles = async () => {
  return prisma.role.findMany({
    orderBy: { id: "asc" },
  });
};

export const createRole = async (title: string, department: string) => {
  return prisma.role.create({
    data: { title, department },
  });
};