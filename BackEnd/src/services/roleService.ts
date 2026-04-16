import { getAllRoles, createRole } from "../repositories/roleRepository";

export const fetchRoles = async () => {
  return getAllRoles();
};

export const addRole = async (title: string, department: string) => {
  if (!title || !department) {
    throw new Error("Title and department are required");
  }

  return createRole(title, department);
};