import { employeeRepo } from "../repositories/employeeRepo";

export const employeeService = {
  createEmployee(
    firstName: string,
    lastName: string,
    departmentId: number
  ) {
    const departments = employeeRepo.getDepartments();

    const departmentExists = departments.some(
      (d) => d.id === departmentId
    );

    if (!departmentExists) {
      return { success: false, message: "Department does not exist." };
    }

    if (firstName.trim().length < 3) {
      return {
        success: false,
        message: "First name must be at least 3 characters."
      };
    }

    const updatedDepartments = employeeRepo.createEmployee(
      firstName.trim(),
      lastName.trim(),
      departmentId
    );

    return { success: true, data: updatedDepartments };
  }
};