import { PrismaClient, Role } from "@prisma/client";
import { faker } from "@faker-js/faker";
import logger from "../src/utils/logger"; // Adjust the import path as necessary

const prisma = new PrismaClient();

async function main() {
  // Create 1000 users
  const users: Promise<import("@prisma/client").User>[] = [];
  for (let i = 0; i < 1000; i++) {
    users.push(
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email({ allowSpecialCharacters: false }),
          password: faker.internet.password(),
          role: faker.helpers.arrayElement([Role.ADMIN, Role.EDITOR, Role.VIEWER]),
        },
      })
    );
  }
  const createdUsers = await Promise.all(users);

  // Create 100,000 documents, randomly assigning to users
  const userIds = createdUsers.map((u) => u.id);
  const docsBatchSize = 1000; // batches
  for (let i = 0; i < 100000; i += docsBatchSize) {
    const docs: {
      title: string;
      content: string;
      fileUrl: string;
      createdById: string;
    }[] = [];
    for (let j = 0; j < docsBatchSize && i + j < 100000; j++) {
      docs.push({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        fileUrl: faker.internet.url(),
        createdById: faker.helpers.arrayElement(userIds),
      });
    }
    await prisma.document.createMany({ data: docs });
    logger.info(`Inserted documents: ${i + docs.length}`);
  }
}

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });