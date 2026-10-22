import pool from "../config/db.js";

export async function createBlog(title, description, category, author, image, userId) {
  const result = await pool.query(
    "INSERT INTO blogs (title, description, category, author, image, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, description, category, author, image, userId],
  );
  return result.rows[0];
}

export async function getAllBlog() {
  return pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
}

export async function getBlogById(id) {
  return pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
}

export async function updateBlog(title, description, category, author, image, id, userId) {
  return pool.query(
    "UPDATE blogs SET title = $1, description = $2, category = $3, author = $4, image = $5 WHERE id = $6 AND user_id = $7 RETURNING *",
    [title, description, category, author, image, id, userId],
  );
}

export async function deleteBlog(id, userId) {
  return pool.query("DELETE FROM blogs WHERE id = $1 AND user_id = $2 RETURNING id", [id, userId]);
}
