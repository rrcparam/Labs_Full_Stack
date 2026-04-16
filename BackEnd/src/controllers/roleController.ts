import { Request, Response } from "express";
import { roleService } from "../services/roleService";

export const roleController = {
  getRoles(req: Request, res: Response) {
    const data = roleService.getRoles();
    res.json(data);
  },

  addRole(req: Request, res: Response) {
    try {
      const { firstName, lastName, role } = req.body;

      const data = roleService.addRole(firstName, lastName, role);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Invalid request."
      });
    }
  }
};