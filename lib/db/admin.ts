import { prisma } from "./client";

async function seedAdmin() {
  await prisma.user.update({
    where: { email: "matej.valtr@gmail.com" },
    data: { role: "ADMIN" },
  });
}

seedAdmin()
  .then(() => console.log("Admin role assigned."))
  .catch(console.error)
  .finally(() => process.exit(0));
