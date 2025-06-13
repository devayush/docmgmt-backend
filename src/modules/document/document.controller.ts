import { Request, Response } from "express";
import { uploadFileToS3 } from "../../utils/fileUpload";
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from "./document.service";
import {
  createDocumentSchema,
  updateDocumentSchema,
} from "./document.validator";

/**
 * List all documents.
 */
export const listDocuments = async (req: Request, res: Response) => {
  const skip = parseInt(req.query.skip as string) || 0;
  const take = parseInt(req.query.take as string) || 20;
  const docs = await getAllDocuments(skip, take);
  res.json(docs);
};

/**
 * Get a document by ID.
 */
export const getDocument = async (req: Request, res: Response) => {
  try {
    const doc = await getDocumentById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });
    res.json(doc);
  } catch {
    res.status(500).json({ error: "Failed to fetch document" });
  }
};

/**
 * Create a new document.
 */
export const createDoc = async (req: Request, res: Response) => {
  try {
    const { title, content } = createDocumentSchema.parse(req.body);
    let fileUrl: string | undefined;
    if (req.file) {
      fileUrl = await uploadFileToS3(req.file); // Use the utility
    }
    const userId = (req as any).userId;
    const doc = await createDocument({
        title, content, fileUrl,
        createdBy: {
            create: undefined,
            connectOrCreate: undefined,
            connect: undefined
        }
    }, userId);
    res.status(201).json(doc);
  } catch {
    res.status(500).json({ error: "Failed to create document" });
  }
};

/**
 * Update a document.
 */
export const updateDoc = async (req: Request, res: Response) => {
  try {
    const { title, content } = updateDocumentSchema.parse(req.body);
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const doc = await updateDocument(req.params.id, {
      title,
      content,
      fileUrl,
    });
    if (!doc) return res.status(404).json({ error: "Document not found" });
    res.json(doc);
  } catch {
    res.status(500).json({ error: "Failed to update document" });
  }
};

/**
 * Delete a document.
 */
export const deleteDoc = async (req: Request, res: Response) => {
  try {
    const doc = await deleteDocument(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });
    res.json({ message: "Document deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete document" });
  }
};
