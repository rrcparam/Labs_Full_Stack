import prisma from "../lib/prisma";

export const getAllEmployees = async () => {
  return prisma.employee.findMany({
    include: { role: true },
    orderBy: { id: "asc" },
  });
};

export const createEmployee = async (
  firstName: string,
  lastName: string,
  email: string,
  roleId: number
) => {
  return prisma.employee.create({
    data: {
      firstName,
      lastName,
      email,
      roleId,
    },
    include: { role: true },
  });
};