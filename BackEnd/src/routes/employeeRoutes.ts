import express, { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { addEmployee, fetchEmployees } from "../services/employeeService";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const employees = await fetchEmployees();

    const formattedEmployees = employees.map((employee: any) => ({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      roleId: employee.roleId,
      roleTitle: employee.role?.title ?? "",
      department: employee.role?.department ?? "",
    }));

    res.json(formattedEmployees);
  } catch (error: any) {
    console.error("GET /employees error:", error);
    res.status(500).json({
      error: "Failed to fetch employees",
      details: error.message,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

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
      roleTitle: employee.role?.title ?? "",
      department: employee.role?.department ?? "",
    });
  } catch (error: any) {
    console.error("POST /employees error:", error);
    res.status(400).json({
      error: error.message || "Failed to create employee",
    });
  }
});

export default router;