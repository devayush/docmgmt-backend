import { z } from "zod";

/**
 * Validation schema for user registration.
 */
export const registerSchema = z.object({
  name: z.string().min(1).max(50).trim(),
  email: z.string().email().max(100).trim(),
  password: z.string().min(6).max(100),
  role: z.string().optional(),
});

/**
 * Validation schema for user login.
 */
export const loginSchema = z.object({
  email: z.string().email().max(100).trim(),
  password: z.string().min(6).max(100),
  role: z.string().optional(),
});

/**
 * Validation schema for updating a user's details.
 */
export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  name: z.string().min(1).optional(),
});
