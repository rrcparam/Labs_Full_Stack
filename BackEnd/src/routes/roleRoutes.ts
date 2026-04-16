import express, { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { addRole, fetchRoles } from "../services/roleService";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const roles = await fetchRoles();
    res.json(roles);
  } catch (error: any) {
    console.error("GET /roles error:", error);
    res.status(500).json({
      error: "Failed to fetch roles",
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
    const { title, department } = req.body;

    const role = await addRole(title, department);

    res.status(201).json(role);
  } catch (error: any) {
    console.error("POST /roles error:", error);
    res.status(400).json({
      error: error.message || "Failed to create role",
    });
  }
});

export default router;