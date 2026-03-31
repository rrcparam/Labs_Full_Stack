import { getAllEmployees, createEmployee } from "../repositories/employeeRepository";

export const fetchEmployees = async () => {
  return getAllEmployees();
};

export const addEmployee = async (
  firstName: string,
  lastName: string,
  email: string,
  roleId: number
) => {
  if (!firstName || !lastName || !email || !roleId) {
    throw new Error("All employee fields are required");
  }

  return createEmployee(firstName, lastName, email, roleId);
};