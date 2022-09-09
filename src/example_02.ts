import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "error", "warn", "info"] });

async function main() {
  await prisma.order.findMany({
    where: {
      status: { notIn: [OrderStatus.Canceled] },
    },
  });
  await prisma.category.findFirstOrThrow({
    where: {
      name: { endsWith: "test" }, // -> %test
    },
  });
  await prisma.user.findUnique({
    where: {
      email: "esdras.amora@taqtile.com.br",
    },
  });
}

main().then(async () => {
  await prisma.$disconnect();
});

// await Promise.all([
//   prisma.user.findUnique({
//     where: {
//       email: "chris.amora@taqtile.com.br",
//     },
//   }),
//   prisma.user.findUnique({
//     where: {
//       email: "esdras.amora@taqtile.com.br",
//     },
//   }),
// ]);
