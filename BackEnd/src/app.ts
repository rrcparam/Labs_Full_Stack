import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import employeeRoutes from "./routes/employeeRoutes";
import roleRoutes from "./routes/roleRoutes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

app.use("/employees", employeeRoutes);
app.use("/roles", roleRoutes);

export default app;