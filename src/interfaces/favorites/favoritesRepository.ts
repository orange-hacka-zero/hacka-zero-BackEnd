export interface IFavoritesRepository {
  create(userId: string, eventId: string): Promise<unknown>;
  getFavorites(userId: string): Promise<unknown>;
  delete(userId: string, eventId: string): Promise<unknown>;
}
