import { IUserCreate, IUserRepository } from "@interfaces/user";
import { Context } from "@/database/mock/client";

class UserRepository implements IUserRepository {
  public async create({ password, email }: IUserCreate, ctx: Context) {
    const newUser = await ctx.prisma.user.create({
      data: {
        password,
        email,
      },
    });

    return newUser;
  }

  public async validateIfEmailExists(email: string, ctx: Context) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  public async getUserByEmail(email: string, ctx: Context) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async getUserById(id: string, ctx: Context) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}

export { UserRepository };
