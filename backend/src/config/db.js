import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: databaseUrl,
});

export async function initializeDatabase() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required. Add your Neon connection string.");
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(254) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id BIGSERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(32) NOT NULL,
      author VARCHAR(100) NOT NULL,
      image TEXT,
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export default pool;
