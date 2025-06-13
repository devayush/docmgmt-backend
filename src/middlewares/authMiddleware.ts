import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

interface JwtPayload {
  userId: string;
}

/**
 * Middleware to ensure the user is authenticated.
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ error: "Access token missing" });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // Attach userId to request for downstream handlers
    (req as any).userId = payload.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: err + " Invalid or expired token" });
  }
};

/**
 * Middleware to ensure the user has admin privileges.
 */
export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = (req as any).userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "ADMIN")
    return res.status(403).json({ error: "Admin access required" });
  next();
}
