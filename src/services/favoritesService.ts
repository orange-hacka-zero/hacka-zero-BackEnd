import {
  IFavoritesRepository,
  IFavoritesService,
} from "@/interfaces/favorites";

class FavoritesService implements IFavoritesService {
  private favoritesRepository: IFavoritesRepository;

  constructor(favoritesRepository: IFavoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }

  public async create(userId: string, eventId: string) {
    const newFavorites = await this.favoritesRepository.create(userId, eventId);

    return newFavorites;
  }

  public async getFavorites(userId: string) {
    const favorites = await this.favoritesRepository.getFavorites(userId);

    return favorites;
  }

  public async delete(userId: string, eventId: string) {
    await this.favoritesRepository.delete(userId, eventId);

    return null;
  }
}

export { FavoritesService };
