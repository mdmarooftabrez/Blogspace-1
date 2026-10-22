import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserForLogin,
} from "../models/user.models.js";

const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
};

export async function registerUser(req, res) {
  const { name, email, password } = req.body ?? {};
  if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string" || !name || !email || !password) {
    return res.status(400).json({ success: false, message: "Enter your name, email, and password." });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser(name.trim(), normalizedEmail, passwordHash);
    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: user,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ success: false, message: "Email is already registered." });
    }

    console.error("Registration error:", error.message);
    return res.status(500).json({ success: false, message: "Could not create your account." });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body ?? {};
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return res.status(400).json({ success: false, message: "Enter your email and password." });
  }

  try {
    const user = await findUserForLogin(email.trim().toLowerCase());
    const passwordMatches = user && await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, sessionCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ success: false, message: "Could not log in." });
  }
}

export function handleLogout(req, res) {
  res.clearCookie("token", sessionCookieOptions);
  return res.status(200).json({ success: true, message: "Logged out successfully." });
}
