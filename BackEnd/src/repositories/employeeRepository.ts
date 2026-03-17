import { departments } from "../data/employeeData";
import type { Department } from "../types/Department";
import type { Employee } from "../types/Employee";

let nextEmployeeId = 4;

export const employeeRepository = {
  getDepartments(): Department[] {
    return departments;
  },

  addEmployee(firstName: string, lastName: string, departmentId: number): Department[] {
    const dept = departments.find((d) => d.id === departmentId);

    if (!dept) {
      throw new Error("Department not found.");
    }

    const newEmployee: Employee = {
      id: nextEmployeeId++,
      firstName,
      lastName
    };

    dept.employees.push(newEmployee);
    return departments;
  }
};