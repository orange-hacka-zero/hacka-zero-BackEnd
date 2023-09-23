import { User } from "@prisma/client";

export interface iUserService {
  createRandomUser(): Promise<User>;
}
