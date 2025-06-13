import request from "supertest";
import { app } from "../../index";
import prisma from "../../lib/prisma";
import { createUser, getToken, cleanupUsers } from "../testUtils";

let userToken: string;
let docId: string;

jest.mock("../../utils/fileUpload", () => ({
  uploadFileToS3: jest.fn().mockResolvedValue("https://mock-s3-url.com/fakefile.pdf"),
}));

beforeAll(async () => {
  await cleanupUsers(["docuser@example.com"]);
  await createUser({
    name: "Doc User",
    email: "docuser@example.com",
    password: "docpassword",
    role: "EDITOR",
  });
  userToken = await getToken("docuser@example.com", "docpassword");
});

afterAll(async () => {
  await cleanupUsers(["docuser@example.com"]);
  await prisma.document.deleteMany({}); // Clean up all documents
  await prisma.$disconnect();
});

describe("Document Module E2E", () => {
  it("should create a document and record the uploader", async () => {
    const res = await request(app)
      .post("/api/documents")
      .set("Authorization", `Bearer ${userToken}`)
			.attach("file", Buffer.from("dummy content"), "test.pdf")
    	.field("title", "Test Doc")
    	.field("content", "Test Content");

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
		expect(res.body.fileUrl).toBe("https://mock-s3-url.com/fakefile.pdf");
    expect(res.body.createdById).toBeDefined();

    docId = res.body.id;

    // Optionally, to check that createdById matches the user's id
    const user = await prisma.user.findUnique({ where: { email: "docuser@example.com" } });
    expect(res.body.createdById).toBe(user?.id);
});

  it("should list all documents", async () => {
    const res = await request(app)
      .get("/api/documents")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a document by id", async () => {
    const res = await request(app)
      .get(`/api/documents/${docId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(docId);
  });

  it("should update a document", async () => {
    const res = await request(app)
      .patch(`/api/documents/${docId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ title: "Updated Title" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Title");
  });

  it("should delete a document", async () => {
    const res = await request(app)
      .delete(`/api/documents/${docId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
