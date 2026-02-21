import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  console.log("Seeding admin user...");

  const hashedPassword = await hash("admin123", 12);

  await prisma.admin.upsert({
    where: { email: "admin@volt.com" },
    update: {},
    create: {
      email: "admin@volt.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("Admin user created: admin@volt.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
