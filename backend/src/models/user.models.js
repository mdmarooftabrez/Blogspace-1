import pool from "../config/db.js";

export async function findUserByEmail(email) {
  const result = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  return result.rows[0];
}

export async function createUser(name, email, passwordHash) {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
    [name, email, passwordHash],
  );
  return result.rows[0];
}

export async function findUserForLogin(email) {
  const result = await pool.query(
    "SELECT id, name, email, password FROM users WHERE email = $1",
    [email],
  );
  return result.rows[0];
}

export async function findUserById(id) {
  const result = await pool.query(
    "SELECT id, name, email, created_at FROM users WHERE id = $1",
    [id],
  );
  return result.rows[0];
}
