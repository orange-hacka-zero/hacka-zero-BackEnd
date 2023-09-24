import { Router } from "express";
import { AuthControllerFactory } from "@/factories/authFactory";

const authRoute = Router();

authRoute.post("/login", (request, response) => {
  return AuthControllerFactory().login(request, response);
});

export { authRoute };
