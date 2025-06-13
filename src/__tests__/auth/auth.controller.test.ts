import prisma from "@/lib/prisma";
import { register, login } from "@/modules/auth/auth.controller";
import { Request, Response } from "express";

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Auth Controller", () => {
  afterAll(async () => {
    // Clean up after tests
    await prisma.$disconnect();
  });

  it("should fail to register if schema is invalid", async () => {
    const req = { body: { email: "invalid" } } as Request;
    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.anything() }),
    );
  });

  it("should fail to login if schema is invalid", async () => {
    const req = { body: {} } as Request;
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
