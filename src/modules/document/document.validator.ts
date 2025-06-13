import { z } from "zod";

/**
 * Validation schema for creating a document.
 */
export const createDocumentSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  // file is handled by multer, so not validated here
});

/**
 * Validation schema for updating a document.
 */
export const updateDocumentSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
});
