import "dotenv/config";
import { prisma } from "../client";
import { authClient } from "@/lib/auth-client";

async function main() {
  const adminEmail = "matej.valtr@gmail.com";
  const adminPassword = "M1nd1V1d30";
  const adminName = "Mate";

  // 1. Find existing user via Prisma (email lookup allowed)
  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    console.log("Admin already exists:", existing.id);

    await authClient.admin.setRole({ userId: existing.id, role: "admin" });

    console.log("Admin role ensured.");
    return;
  }

  // 2. Create user via Better Auth
  const { data, error } = await authClient.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    name: adminName,
    role: "admin",
  });

  console.log("User admin created:", data);
}

main()
  .then(() => {
    console.log("Admin setup done");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
