import { signup, signin } from "@/modules/auth/auth.service";
import prisma from "@/lib/prisma";
import { cleanupUsers } from "../testUtils";

const testEmail = "testuser@example.com";
const testPassword = "password123";
const testName = "Test User";

beforeAll(async () => {
  await cleanupUsers([testEmail]);
});

afterAll(async () => {
  await cleanupUsers([testEmail]);
  await prisma.$disconnect();
});

describe("Auth Service", () => {
  it("should create a new user", async () => {
    const user = await signup(testName, testEmail, testPassword);
    expect(user).toHaveProperty("id");
    expect(user.email).toBe(testEmail);
    expect(user.name).toBe(testName);
  });

  it("should login successfully and return a token", async () => {
    const result = await signin(testEmail, testPassword);
    expect(result).toHaveProperty("token");
  });

  it("should fail to login with wrong password", async () => {
    await expect(signin(testEmail, "wrongpassword")).rejects.toThrow();
  });
});
