import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.employee.deleteMany();
  await prisma.role.deleteMany();

  await prisma.role.createMany({
    data: [
      { title: "CEO", department: "Executive" },
      { title: "CTO", department: "Technology" },
      { title: "CFO", department: "Finance" },
      { title: "Manager", department: "Operations" }
    ],
    skipDuplicates: true
  });

  const allRoles = await prisma.role.findMany({
    orderBy: { id: "asc" }
  });

  if (allRoles.length >= 4) {
    await prisma.employee.createMany({
      data: [
        {
          firstName: "Param",
          lastName: "Singh",
          email: "param@example.com",
          roleId: allRoles[0].id
        },
        {
          firstName: "Mehak",
          lastName: "Singh",
          email: "mehak@example.com",
          roleId: allRoles[1].id
        }
      ],
      skipDuplicates: true
    });
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });