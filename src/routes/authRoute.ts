import { Router } from "express";
import { AuthControllerFactory } from "@/factories/authFactory";
import { AuthenticationRequest } from "@/interfaces/express";
import { isAdminMiddleware } from "@/middlewares/isAdminMiddleware";
import { AuthMiddlewareFactory } from "@/factories/authMiddlewareFactor";

const authRoute = Router();

authRoute.post("/login", (request, response) => {
  return AuthControllerFactory().login(request, response);
});

authRoute.get(
  "/test",
  (request: AuthenticationRequest, response, next) => {
    return AuthMiddlewareFactory().authenticate(request, response, next);
  },
  (request: AuthenticationRequest, response) => {
    return response.json({ message: "ok" });
  }
);

authRoute.get(
  "/test/admin",
  (request: AuthenticationRequest, response, next) => {
    return AuthMiddlewareFactory().authenticate(request, response, next);
  },
  isAdminMiddleware,
  (request: AuthenticationRequest, response) => {
    return response.json({ message: "ok" });
  }
);

export { authRoute };
