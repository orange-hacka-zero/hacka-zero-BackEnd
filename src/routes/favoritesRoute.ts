import { Router } from "express";
import { FavoritesControllerFactory } from "@/factories/favoritesFactory";
import { AuthMiddlewareFactory } from "@/factories/authMiddlewareFactor";
import { AuthenticationRequest } from "@interfaces/express";

const favoritesRouter = Router();

favoritesRouter.post(
  "/create",
  (request: AuthenticationRequest, response, next) => {
    return AuthMiddlewareFactory().authenticate(request, response, next);
  },
  async (request, response) => {
    return FavoritesControllerFactory().create(request, response);
  }
);

favoritesRouter.get(
  "/get_all",
  (request: AuthenticationRequest, response, next) => {
    return AuthMiddlewareFactory().authenticate(request, response, next);
  },
  async (request, response) => {
    return FavoritesControllerFactory().getFavorites(request, response);
  }
);

favoritesRouter.delete(
  "/delete/:id",
  (request: AuthenticationRequest, response, next) => {
    return AuthMiddlewareFactory().authenticate(request, response, next);
  },
  async (request, response) => {
    return FavoritesControllerFactory().delete(request, response);
  }
);

export { favoritesRouter };
