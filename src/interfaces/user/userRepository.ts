import { IUserCreate } from "./userInterface";
import { User } from "@prisma/client";

export interface IUserRepository {
  create: (data: IUserCreate) => Promise<User>;
  validateIfEmailExists: (email: string) => Promise<boolean>;
}
