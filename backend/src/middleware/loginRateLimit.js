import { ipKeyGenerator, rateLimit } from "express-rate-limit";

const windowMs = 15 * 60 * 1000;
const tooManyAttempts = {
  success: false,
  message: "Too many login attempts. Please try again later.",
};

export const loginIpLimiter = rateLimit({
  windowMs,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: tooManyAttempts,
});

export const loginAccountIpLimiter = rateLimit({
  windowMs,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: (req) => {
    const ip = ipKeyGenerator(req.ip || req.socket.remoteAddress || "unknown");
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase().slice(0, 254)
        : "";

    return `${ip}:${email}`;
  },
  message: tooManyAttempts,
});
