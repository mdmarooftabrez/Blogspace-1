import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blog.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.set("trust proxy", 1);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../");
const frontendDist = path.join(projectRoot, "frontend", "dist");

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

app.use(express.static(frontendDist, { index: false, maxAge: "1h" }));
app.get("/{*path}", (req, res, next) => {
  res.sendFile(path.join(frontendDist, "index.html"), (error) => {
    if (error) next(error);
  });
});

export default app;
