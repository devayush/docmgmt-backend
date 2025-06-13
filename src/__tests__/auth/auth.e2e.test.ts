import request from "supertest";
import { app } from "../../index";
import prisma from "../../lib/prisma";
import { createUser, cleanupUsers } from "../testUtils";

beforeAll(async () => {
  await cleanupUsers(["user@example.com"]);
});

afterAll(async () => {
  await cleanupUsers(["user@example.com"]);
  await prisma.$disconnect();
});

describe("Auth API", () => {
  it("should register user via POST /api/auth/register", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "user@example.com", password: "secure123", name: "User" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should login user via POST /api/auth/login", async () => {
    // User already registered in previous test
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@example.com", password: "secure123" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
