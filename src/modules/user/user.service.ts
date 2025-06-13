import prisma from "../../lib/prisma";
import type { User, Role } from "@prisma/client";

/**
 * List all users.
 * @returns {Promise<Pick<User, "id" | "name" | "email" | "role">[]>}
 */
export const listUsers = async (): Promise<
  Pick<User, "id" | "name" | "email" | "role">[]
> => {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });
};

/**
 * Update a user's role.
 * @param {string} id - User ID
 * @param {Role} role - New role
 * @returns {Promise<Pick<User, "id" | "name" | "email" | "role">>}
 */
export const updateUserRole = async (
  id: string,
  role: Role,
  adminId: string
): Promise<Pick<User, "id" | "name" | "email" | "role" | "modifiedById">> => {
  return prisma.user.update({
    where: { id },
    data: { role, modifiedById: adminId },
    select: { id: true, name: true, email: true, role: true, modifiedById: true },
  });
};
