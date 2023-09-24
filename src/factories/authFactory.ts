import { AuthService } from "@/services/authService";
import { JwtAdapter } from "@/utils/jwtAdapter";
import { prisma } from "@database/client";
import { BcryptAdapter } from "@/utils/bcryptAdapter";
import { UserRepository } from "@/repositories/userRepository";
import { AuthController } from "@/controllers/authController";
import config from "@/config/environment";

const { secret } = config.jwt;

const AuthControllerFactory = () => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const userRepository = new UserRepository();
  const jwtAdapter = new JwtAdapter(secret);
  const authService = new AuthService(
    jwtAdapter,
    prisma,
    bcryptAdapter,
    userRepository
  );
  const authController = new AuthController(authService);
  return authController;
};

export { AuthControllerFactory };
