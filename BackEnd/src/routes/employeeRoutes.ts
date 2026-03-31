import express from "express";
import { addEmployee, fetchEmployees } from "../services/employeeService";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const employees = await fetchEmployees();

    const formattedEmployees = employees.map((employee) => ({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      roleId: employee.roleId,
      roleTitle: employee.role.title,
      department: employee.role.department,
    }));

    res.json(formattedEmployees);
  } catch {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, roleId } = req.body;

    const employee = await addEmployee(
      firstName,
      lastName,
      email,
      Number(roleId)
    );

    res.status(201).json({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      roleId: employee.roleId,
      roleTitle: employee.role.title,
      department: employee.role.department,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;