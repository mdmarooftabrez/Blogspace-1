import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId) throw new Error("Invalid session payload.");
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
