import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetPassword() {
  await prisma.user.update({
    where: { email: "matej.valtr@gmail.com" },
    data: {
      password: "1W$w!nUVb3QST^tHC4JuUauCHjA!%c",
    },
  });
}

resetPassword();
