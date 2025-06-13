// Specifically used JSDoc to document the service functions - just a sample to showcase
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Role, User } from "@prisma/client";

/**
 * Register a new user.
 * @param name - User's name
 * @param email - User's email
 * @param password - User's password (plain text)
 * @param role - User's role (optional)
 * @returns The created user (without password)
 */
export const signup = async (
  name: string,
  email: string,
  password: string,
  role: Role = "VIEWER",
): Promise<Pick<User, "id" | "name" | "email" | "role">> => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
    select: { id: true, name: true, email: true, role: true },
  });
  return user;
};

/**
 * Authenticate a user and return a JWT token.
 * @param email - User's email
 * @param password - User's password (plain text)
 * @returns An object with a JWT token
 */
export const signin = async (
  email: string,
  password: string,
): Promise<{ token: string }> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );
  return { token };
};
