import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "error", "warn", "info"] });

async function main() {
  await prisma.product.groupBy({
    _avg: { amountAvalible: true, price: true },
    by: ["categoryId"],
  });
  await prisma.order.count();
  await prisma.category.create({
    data: {
      name: "nova categoria",
      product: {
        createMany: {
          data: [
            { amountAvalible: 3, name: "notebook", price: 500 },
            { amountAvalible: 3, name: "iphone", price: 2500.3 },
          ],
        },
      },
    },
  });
  await prisma.orderItem.findMany({
    where: { product: { category: { name: { contains: "nova" } } } },
    include: { Order: true },
  });
  await prisma.orderItem.findMany({
    where: { product: { category: { name: { contains: "nova" } } } },
    include: { Order: true },
    skip: 2,
    take: 10,
    // cursor: { id: "some_uuid" },
    orderBy: [{ createdAt: "desc" }, { product: { price: "asc" } }],
  });
}

main().then(async () => {
  await prisma.$disconnect();
});
