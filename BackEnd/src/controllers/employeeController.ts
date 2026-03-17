import { Request, Response } from "express";
import { employeeService } from "../services/employeeService";

export const employeeController = {
  getDepartments(req: Request, res: Response) {
    const data = employeeService.getDepartments();
    res.json(data);
  },

  addEmployee(req: Request, res: Response) {
    try {
      const { firstName, lastName, departmentId } = req.body;

      const data = employeeService.addEmployee(
        firstName,
        lastName,
        Number(departmentId)
      );

      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Invalid request."
      });
    }
  }
};