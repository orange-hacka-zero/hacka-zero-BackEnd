import { NextFunction, Response } from "express";
import { AuthenticationRequest } from "@/interfaces/express";
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "@/interfaces/user";
import { IJwtAdapter } from "@/interfaces/jwt";

class AuthMiddleware {
  private jwtAdapter: IJwtAdapter;
  private prisma: PrismaClient;
  private userRepository: IUserRepository;

  constructor(
    jwtAdapter: IJwtAdapter,
    prisma: PrismaClient,
    userRepository: IUserRepository
  ) {
    this.jwtAdapter = jwtAdapter;
    this.prisma = prisma;
    this.userRepository = userRepository;
  }

  public authenticate = async (
    req: AuthenticationRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Autorização inválida" });
    }

    const [type, token] = authorization.split(" ");
    try {
      if (type !== "Bearer" || !token) {
        return res.status(401).json({ message: "Autorização inválida" });
      }

      const { id, role } = await this.jwtAdapter.verify(token);

      const user = await this.userRepository.getUserById(id, {
        prisma: this.prisma,
      });

      if (!user) {
        return res.status(401).json({ message: "Autorização inválida" });
      }

      req.auth = { id, role };

      return next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Autorização inválida" });
    }
  };
}

export { AuthMiddleware };
