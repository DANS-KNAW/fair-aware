import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const defaultLanguage = await prisma.language.upsert({
    where: { code: "en" },
    update: {},
    create: {
      code: "en",
      name: "English",
    },
  });
  const defaultDot = await prisma.dOT.upsert({
    where: { dot: "DATA" },
    update: {},
    create: {
      dot: "DATA",
      name: "Research Dataset",
    },
  });
  console.log({ defaultLanguage, defaultDot });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: Error) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
