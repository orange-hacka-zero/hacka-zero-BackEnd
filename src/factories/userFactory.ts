import { UserController } from "@/controllers/userController";
import { UserService } from "@/services/userService";
import { prisma } from "@database/client";
import { BcryptAdapter } from "@/utils/bcryptAdapter";
import { UserRepository } from "@/repositories/userRepository";

const UserControllerFactory = () => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository, prisma, bcryptAdapter);
  const userController = new UserController(userService);
  return userController;
};

export { UserControllerFactory };
