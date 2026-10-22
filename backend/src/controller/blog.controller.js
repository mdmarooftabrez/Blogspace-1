import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
} from "../models/blog.models.js";
import { findUserById } from "../models/user.models.js";

function getBlogInput(body = {}) {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  const category = typeof body.category === "string" ? body.category : "";
  const image = typeof body.image === "string" ? body.image.trim() : "";

  if (!title || !description || !["Travel", "Technology", "Lifestyle"].includes(category)) {
    return null;
  }

  return { title, description, category, image: image || null };
}

function isValidImageUrl(image) {
  if (!image) return true;

  try {
    return ["http:", "https:"].includes(new URL(image).protocol);
  } catch {
    return false;
  }
}

function sendError(res, error) {
  console.error("Blog error:", error.message);
  return res.status(500).json({ success: false, message: "Something went wrong." });
}

export async function handleCreateBlog(req, res) {
  const input = getBlogInput(req.body);
  if (!input) {
    return res.status(400).json({ success: false, message: "Enter a title, description, and valid category." });
  }
  if (!isValidImageUrl(input.image)) {
    return res.status(400).json({ success: false, message: "Enter a valid HTTP or HTTPS image URL." });
  }

  try {
    const user = await findUserById(req.user.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Your session has expired." });
    }

    const blog = await createBlog(
      input.title,
      input.description,
      input.category,
      user.name,
      input.image,
      user.id,
    );
    return res.status(201).json({
      success: true,
      message: "Story published.",
      data: blog,
    });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function handleGetAllBlog(req, res) {
  try {
    const result = await getAllBlog();
    return res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function handleGetBlogById(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ success: false, message: "Invalid blog ID." });
  }

  try {
    const result = await getBlogById(id);
    if (!result.rows.length) {
      return res.status(404).json({ success: false, message: "Story not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Story updated.",
      data: result.rows[0],
    });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function handleUpdateBlog(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ success: false, message: "Invalid blog ID." });
  }

  const input = getBlogInput(req.body);
  if (!input) {
    return res.status(400).json({ success: false, message: "Enter a title, description, and valid category." });
  }
  if (!isValidImageUrl(input.image)) {
    return res.status(400).json({ success: false, message: "Enter a valid HTTP or HTTPS image URL." });
  }

  try {
    const user = await findUserById(req.user.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Your session has expired." });
    }

    const result = await updateBlog(
      input.title,
      input.description,
      input.category,
      user.name,
      input.image,
      id,
      user.id,
    );
    if (!result.rows.length) {
      return res.status(404).json({ success: false, message: "Story not found or you do not own it." });
    }
    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function handleDeleteBlog(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ success: false, message: "Invalid blog ID." });
  }

  try {
    const result = await deleteBlog(id, req.user.userId);
    if (!result.rows.length) {
      return res.status(404).json({ success: false, message: "Story not found or you do not own it." });
    }
    return res.status(200).json({ success: true, message: "Story deleted." });
  } catch (error) {
    return sendError(res, error);
  }
}
