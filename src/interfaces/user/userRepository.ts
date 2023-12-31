import { IUserCreate } from "./userInterface";
import { User } from "@prisma/client";
import { Context } from "@/database/mock/client";

export interface IUserRepository {
  create: (data: IUserCreate, ctx: Context) => Promise<User>;
  validateIfEmailExists: (email: string, ctx: Context) => Promise<boolean>;
  getUserByEmail: (email: string, ctx: Context) => Promise<User | null>;
  getUserById: (id: string, ctx: Context) => Promise<User | null>;
}
