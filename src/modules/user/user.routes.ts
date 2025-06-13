import { Router } from "express";
import { getAllUsers, patchUserRole } from "./user.controller";
import {
  authenticateToken,
  requireAdmin,
} from "../../middlewares/authMiddleware";

const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: List all users (admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/users", authenticateToken, requireAdmin, getAllUsers);

/**
 * @openapi
 * /users/{id}/role:
 *   patch:
 *     summary: Update a user's role (admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.patch("/users/:id/role", authenticateToken, requireAdmin, patchUserRole);

export default router;
