import { prisma } from "@database/client";
import { FavoritesRepository } from "@/repositories/favoritesRepository";
import { FavoritesService } from "@/services/favoritesService";
import { FavoritesController } from "@/controllers/favoritesController";

const FavoritesControllerFactory = (): FavoritesController => {
  const cxt = {
    prisma,
  };
  const favoritesRepository = new FavoritesRepository(cxt);
  const favoritesService = new FavoritesService(favoritesRepository);
  const favoritesController = new FavoritesController(favoritesService);

  return favoritesController;
};

export { FavoritesControllerFactory };
