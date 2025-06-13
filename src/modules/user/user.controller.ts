import { Request, Response } from "express";
import type { Role } from "@prisma/client";
import { listUsers, updateUserRole } from "./user.service";
import { updateUserRoleSchema } from "./user.validator";

/**
 * List all users (admin only).
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

/**
 * Update a user's role (admin only) and log the admin who made the change.
 */
export const patchUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = updateUserRoleSchema.parse(req.body);
  const adminId = (req as any).userId; 

  try {
    const user = await updateUserRole(id, role as Role, adminId);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: "User not found or update failed" });
  }
};