import { IFavoritesService } from "@/interfaces/favorites";
import { Response } from "express";
import { AuthenticationRequest } from "@/interfaces/express";

class FavoritesController {
  private favoritesService: IFavoritesService;

  constructor(favoritesService: IFavoritesService) {
    this.favoritesService = favoritesService;
  }

  public async create(request: AuthenticationRequest, response: Response) {
    const { eventId } = request.body;
    const id = request.auth?.id;

    if (!eventId || !id) {
      return response
        .status(400)
        .json({ error: "Nem todos os parâmetros foram enviado" });
    }

    try {
      const newFavorite = await this.favoritesService.create(id, eventId);

      return response.json(newFavorite);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Ocorreu um erro ao favoritar o evento" });
    }
  }

  public async getFavorites(
    request: AuthenticationRequest,
    response: Response
  ) {
    const id = request.auth?.id;

    if (!id) {
      return response
        .status(400)
        .json({ error: "Nem todos os parâmetros foram enviado" });
    }

    try {
      const favorites = await this.favoritesService.getFavorites(id);

      return response.json(favorites);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Ocorreu um erro ao buscar os favoritos" });
    }
  }

  public async delete(request: AuthenticationRequest, response: Response) {
    const { id: eventId } = request.params;
    const id = request.auth?.id;

    if (!eventId || !id) {
      return response
        .status(400)
        .json({ error: "Nem todos os parâmetros foram enviado" });
    }

    try {
      await this.favoritesService.delete(id, eventId);

      return response.json({ message: "Evento deletado dos favoritos" });
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Ocorreu um erro ao deletar o evento dos favoritos" });
    }
  }
}

export { FavoritesController };
