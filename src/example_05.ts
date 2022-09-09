import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "error", "warn", "info"] });

const input = [
  { price: "999.00", amountAvalible: 2, name: "ps5" },
  { price: 20_000.15, amountAvalible: 3, name: "pc da nasa" },
  { price: "800.20", amountAvalible: 7, name: "nintendo switch" },
];

async function main() {
  const placeholder = input.map(
    ({ price, amountAvalible, name }) =>
      Prisma.sql`(${price}::DECIMAL, ${amountAvalible}, ${name})`
  );

  const result = await prisma.$queryRaw<{ id: string; name: string }[]>`
        INSERT INTO product (price, amount_avalible, "name") VALUES ${Prisma.join(
          placeholder
        )}
        ON CONFLICT (name)
        DO UPDATE SET price = EXCLUDED.price, amount_avalible = EXCLUDED.amount_avalible
        RETURNING id, name`;

  console.log(result);
}

main().then(async () => {
  await prisma.$disconnect();
});
