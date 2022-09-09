import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "error", "warn", "info"] });

async function main() {
  await prisma.category.create({
    data: { name: "test" },
  });
  await prisma.user.createMany({
    data: [
      { email: "foo.bar@gmail.com" },
      { email: "esdras.amora@taqtile.com" },
      { email: "felipe.waku@taqtile.com" },
    ],
  });
  prisma.product.upsert({
    where: { name: "tenis daora" },
    create: { price: "300.00", amountAvalible: 2, name: "tenis daora" },
    update: { price: "300.00", amountAvalible: 2, name: "tenis daora" },
  });
}

main().then(async () => {
  await prisma.$disconnect();
});

// await prisma.product.delete({ where: { name: "tenis daora" } });
// await Promise.all(
//   Array.from({ length: 100 })
//     .fill(0)
//     .map(() =>
//       prisma.product.upsert({
//         where: { name: "tenis daora" },
//         create: { price: "300.00", amountAvalible: 2, name: "tenis daora" },
//         update: { price: "300.00", amountAvalible: 2, name: "tenis daora" },
//       })
//     )
// );
