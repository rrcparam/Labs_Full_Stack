import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 3001;
console.log("DATABASE_URL =", process.env.DATABASE_URL);
console.log("CLERK_PUBLISHABLE_KEY loaded:", !!process.env.CLERK_PUBLISHABLE_KEY);
console.log("CLERK_SECRET_KEY loaded:", !!process.env.CLERK_SECRET_KEY);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});