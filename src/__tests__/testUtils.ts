import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import request from "supertest";
import { app } from "../index";
import { Role } from "@prisma/client";

export async function createUser({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, password: hashedPassword, role: role as Role },
  });
}

export async function getToken(email: string, password: string) {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email, password });
  return res.body.token;
}

export async function cleanupUsers(emails: string[]) {
  await prisma.user.deleteMany({ where: { email: { in: emails } } });
}
