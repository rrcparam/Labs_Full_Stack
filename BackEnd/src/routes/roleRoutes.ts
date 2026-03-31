import express from "express";
import { addRole, fetchRoles } from "../services/roleService";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const roles = await fetchRoles();
    res.json(roles);
  } catch {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, department } = req.body;
    const role = await addRole(title, department);
    res.status(201).json(role);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;