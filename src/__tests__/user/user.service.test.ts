import request from "supertest";
import { app } from "../../index";
import prisma from "../../lib/prisma";
import { createUser, getToken, cleanupUsers } from "../testUtils";

let adminToken: string;
let testUserId: string;

beforeAll(async () => {
  await cleanupUsers(["admin@example.com", "testuser@example.com"]);
  await createUser({
    name: "Admin",
    email: "admin@example.com",
    password: "adminpassword",
    role: "ADMIN",
  });
  adminToken = await getToken("admin@example.com", "adminpassword");
});

afterAll(async () => {
  await cleanupUsers(["admin@example.com", "testuser@example.com"]);
  await prisma.$disconnect();
});

describe("User Module", () => {
  it("should list all users (admin only)", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a user role (admin only)", async () => {
    const user = await createUser({
      name: "Test User",
      email: "testuser@example.com",
      password: "testpassword",
      role: "VIEWER",
    });
    testUserId = user.id;

    const res = await request(app)
      .patch(`/api/users/${testUserId}/role`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ role: "EDITOR" });

    expect(res.status).toBe(200);
    expect(res.body.role).toBe("EDITOR");
  });
});
