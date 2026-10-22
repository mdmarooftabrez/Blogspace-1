import express from "express";
import {
  handleCreateBlog,
  handleDeleteBlog,
  handleGetAllBlog,
  handleGetBlogById,
  handleUpdateBlog,
} from "../controller/blog.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", handleGetAllBlog);
router.get("/:id", handleGetBlogById);
router.post("/", verifyToken, handleCreateBlog);
router.put("/:id", verifyToken, handleUpdateBlog);
router.delete("/:id", verifyToken, handleDeleteBlog);

export default router;
