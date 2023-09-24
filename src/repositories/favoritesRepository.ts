import { Context } from "@/database/mock/client";

class FavoritesRepository {
  private ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  public async create(userId: string, eventId: string) {
    const newFavorite = await this.ctx.prisma.favorites.upsert({
      where: {
        userId: userId,
      },
      update: {
        events: {
          connect: {
            id: eventId,
          },
        },
      },
      create: {
        events: {
          connect: {
            id: eventId,
          },
        },
        userId: userId,
      },
      select: {
        events: {
          where: {
            id: eventId,
          },
          select: {
            name: true,
            id: true,
            date: true,
            modalities: true,
            paymentType: true,
            address: true,
            description: true,
            link: true,
          },
        },
      },
    });

    return newFavorite;
  }

  public getFavorites(userId: string) {
    return this.ctx.prisma.favorites.findUnique({
      where: {
        userId: userId,
      },
      include: {
        events: {
          select: {
            name: true,
            id: true,
            date: true,
            modalities: true,
            paymentType: true,
            address: true,
            description: true,
            link: true,
          },
        },
      },
    });
  }

  public async delete(userId: string, eventId: string) {
    const deletedFavorite = await this.ctx.prisma.favorites.update({
      where: {
        userId: userId,
      },
      data: {
        events: {
          disconnect: {
            id: eventId,
          },
        },
      },
    });

    return deletedFavorite;
  }
}

export { FavoritesRepository };
