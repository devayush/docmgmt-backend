// jest.setup.ts
import { prisma } from "./lib/prisma";

afterAll(async () => {
  await prisma.$disconnect();
});
