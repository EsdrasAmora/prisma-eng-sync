import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "error", "warn", "info"] });

async function main() {
  const t1 = await prisma.product.findFirst({
    select: { name: true, price: true },
    // include: { OrderItem: true },
  });
  await prisma.product.findFirst({
    // where: { amount: { lt: 5 } },
    // where: { amountAvalible: { gt: 3 } },
  });
  await prisma.product.findFirst({
    // where: { name: { contains: "teste" } },
    // where: { name: { in: [8, 2, 4] } },
  });

  console.log(t1);
}

main().then(async () => {
  await prisma.$disconnect();
});
