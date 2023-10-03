import { PrismaClient, Prisma } from "@prisma/client";
import { createUser } from "../src/api/v1/users/v1.users.services";
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  const user = await createUser({
    email: "taylor@test.com",
    password: "password",
  });

  const tasksList = [
    {
      title: "Task 1",
      description: "Description 1",
      userId: user.id,
      status: "New",
    },
    {
      title: "Task 2",
      description: "Description 2",
      userId: user.id,
      status: "New",
    },
  ];

  Promise.all(
    tasksList.map((task) => {
      return prisma.task.create({
        data: task,
      });
    })
  );

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
