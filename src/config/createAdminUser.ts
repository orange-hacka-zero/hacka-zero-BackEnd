import { PrismaClient } from "@prisma/client";
import { BcryptAdapter } from "@/utils/bcryptAdapter";

const prisma = new PrismaClient();
const bcryptAdapter = new BcryptAdapter(12);

//credencial publica para avaliadores (não faça isso em produção😨)
const defaultAdminEmail = "user-HGe4zeehyi@techMeets.com";
const defaultAdminPassword = "ezjWSaPxDs7nhd7";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

async function main() {
  //create Default admin user if not exists

  const hashAdminPassword =
    await bcryptAdapter.hashPassword(defaultAdminPassword);

  console.log("Criando usuário administrador padrão...");
  await prisma.user.upsert({
    where: {
      email: defaultAdminEmail,
    },
    create: {
      email: defaultAdminEmail,
      password: hashAdminPassword,
      role: "ADMIN",
    },
    update: {
      email: defaultAdminEmail,
      password: hashAdminPassword,
      role: "ADMIN",
    },
  });
  console.log("Usuário administrador padrão criado com sucesso!");

  const existingAdminUser = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
      NOT: {
        email: defaultAdminEmail,
      },
    },
  });

  if (!existingAdminUser) {
    if (!email || !password) {
      console.log(`Você não definiu as variáveis de ambiente ADMIN_EMAIL e ADMIN_PASSWORD, o usuário administrador padrão será criado com as credenciais padrões:
       email: "user-000000111abB@techMeets.com"
       password: "senha12345678911"
       `);
    }
    const cryptPassword = await bcryptAdapter.hashPassword(
      password || "senha12345678911"
    );

    await prisma.user.create({
      data: {
        password: cryptPassword,
        role: "ADMIN",
        email: email ? email : "user-000000111abB@techMeets.com",
      },
    });
    console.log("Usuário administrador padrão criado com sucesso!");
  } else {
    console.log("Já existe um usuário administrador no banco de dados.");
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
