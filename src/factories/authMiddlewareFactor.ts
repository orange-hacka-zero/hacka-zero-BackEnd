import { AuthMiddleware } from "@/middlewares/authMiddleware";
import { UserRepository } from "@/repositories/userRepository";
import { JwtAdapter } from "@/utils/jwtAdapter";
import { prisma } from "@database/client";

const AuthMiddlewareFactor = (): AuthMiddleware => {
  const jwtSecret = "secret";
  const jwtAdapter = new JwtAdapter(jwtSecret);
  const userRepository = new UserRepository();

  const authMiddleware = new AuthMiddleware(jwtAdapter, prisma, userRepository);

  return authMiddleware;
};

export { AuthMiddlewareFactor };
