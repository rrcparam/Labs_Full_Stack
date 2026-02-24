import type { Department } from "../types/Department";
import type { Employee } from "../types/Employee";

let departments: Department[] = [
  {
    id: 1,
    name: "Finance",
    employees: []
  },
  {
    id: 2,
    name: "Marketing",
    employees: []
  }
];

let nextEmployeeId = 1;

export const employeeRepo = {
  getDepartments(): Department[] {
    return departments;
  },

  createEmployee(
    firstName: string,
    lastName: string,
    departmentId: number
  ): Department[] {
    const newEmployee: Employee = {
      id: nextEmployeeId++,
      firstName,
      lastName,
      departmentId
    };

    departments = departments.map((dept) =>
      dept.id === departmentId
        ? { ...dept, employees: [...dept.employees, newEmployee] }
        : dept
    );

    return departments;
  }
};