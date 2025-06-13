// Specifically used JSDoc to document the service functions - just a sample to showcase
import prisma from "../../lib/prisma";
import type { Document, Prisma } from "@prisma/client";

/**
 * Fetch all documents from the database.
 * @returns Promise resolving to an array of Document objects.
 */
export const getAllDocuments = async (skip: number, take: number): Promise<Document[]> => {
  return prisma.document.findMany({ skip, take });
};

/**
 * Fetch a single document by its ID.
 * @param id - The document's unique identifier.
 * @returns Promise resolving to the Document object or null if not found.
 */
export const getDocumentById = async (id: string): Promise<Document | null> => {
  return prisma.document.findUnique({ where: { id } });
};

/**
 * Create a new document.
 * @param data - The document creation data.
 * @returns Promise resolving to the created Document object.
 */
export const createDocument = async (
  data: Prisma.DocumentCreateInput,
  userId: string
): Promise<Document> => {
  return prisma.document.create({
    data: {
      ...data,
      createdBy: { connect: { id: userId } },
    },
  });
};

/**
 * Update an existing document.
 * @param id - The document's unique identifier.
 * @param data - The fields to update.
 * @returns Promise resolving to the updated Document object.
 */
export const updateDocument = async (
  id: string,
  data: Prisma.DocumentUpdateInput,
): Promise<Document> => {
  return prisma.document.update({ where: { id }, data });
};

/**
 * Delete a document by its ID.
 * @param id - The document's unique identifier.
 * @returns Promise resolving to the deleted Document object.
 */
export const deleteDocument = async (id: string): Promise<Document> => {
  return prisma.document.delete({ where: { id } });
};