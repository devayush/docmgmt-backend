import { z } from "zod";

/**
 * Validation schema for updating a user's role.
 */
export const updateUserRoleSchema = z.object({
  role: z.string().min(1),
});
