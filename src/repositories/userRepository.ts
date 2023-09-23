import { prisma } from "@database/client";
import { IUserCreate, IUserRepository } from "@interfaces/user";
import { Context } from "@/database/mock/client";

//const { user } = prisma;

class UserRepository implements IUserRepository {
  public async create({ password, name, email }: IUserCreate, ctx: Context) {
    const newUser = await ctx.prisma.user.create({
      data: {
        password,
        name,
        email,
      },
    });

    return newUser;
  }

  public async validateIfEmailExists(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }
}

export { UserRepository };
