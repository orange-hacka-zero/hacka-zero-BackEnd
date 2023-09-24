import { AuthenticationRequest } from "@/interfaces/express";
import { NextFunction, Response } from "express";

const isAdminMiddleware = (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.auth) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  const { role } = req.auth;

  if (role !== "ADMIN") {
    return res.status(401).json({ message: "Acesso negado" });
  }
  return next();
};

export { isAdminMiddleware };
