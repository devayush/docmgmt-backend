import { Router } from "express";
import multer from "multer";
import {
  listDocuments,
  getDocument,
  createDoc,
  updateDoc,
  deleteDoc,
} from "./document.controller";
import { authenticateToken } from "../../middlewares/authMiddleware";

const upload = multer({ dest: "uploads/" });
const router = Router();

/**
 * @openapi
 * /documents:
 *   get:
 *     summary: List all documents
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of documents per page
 *     responses:
 *       200:
 *         description: A list of documents
 */
router.get("/documents", authenticateToken, listDocuments);

/**
 * @openapi
 * /documents/{id}:
 *   get:
 *     summary: Get a document by ID
 *     tags:
 *       - Documents
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document details
 *       404:
 *         description: Document not found
 */
router.get("/documents/:id", authenticateToken, getDocument);

/**
 * @openapi
 * /documents:
 *   post:
 *     summary: Create a new document
 *     tags:
 *       - Documents
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Document created successfully
 */
router.post("/documents", authenticateToken, upload.single("file"), createDoc);

/**
 * @openapi
 * /documents/{id}:
 *   patch:
 *     summary: Update a document
 *     tags:
 *       - Documents
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Document updated successfully
 */
router.patch("/documents/:id", authenticateToken, upload.single("file"), updateDoc);

/**
 * @openapi
 * /documents/{id}:
 *   delete:
 *     summary: Delete a document
 *     tags:
 *       - Documents
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document deleted successfully
 */
router.delete("/documents/:id", authenticateToken, deleteDoc);

export default router;
