import { Request, Response } from "express";
import { signup, signin } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.validator";
import type { Role } from "@prisma/client";

/**
 * Register a new user.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = registerSchema.parse(req.body);
    const user = await signup(name, email, password, role as Role);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Login a user and return a JWT token.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await signin(email, password);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
