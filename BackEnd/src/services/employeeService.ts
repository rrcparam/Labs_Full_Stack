import { employeeRepository } from "../repositories/employeeRepository";

export const employeeService = {
  getDepartments() {
    return employeeRepository.getDepartments();
  },

  addEmployee(firstName: string, lastName: string, departmentId: number) {
    const f = firstName.trim();
    const l = lastName.trim();

    if (f.length < 2) {
      throw new Error("First name must be at least 2 characters.");
    }

    if (!l) {
      throw new Error("Last name is required.");
    }

    return employeeRepository.addEmployee(f, l, departmentId);
  }
};