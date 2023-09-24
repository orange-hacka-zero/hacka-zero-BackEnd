import { IBcryptAdapter } from "@/interfaces/bcrypt";
import { IUserCreate, IUserRepository } from "@/interfaces/user";
import { PrismaClient } from "@prisma/client";
import { iUserService } from "@/interfaces/user";

class UserService implements iUserService {
  private UserRepository: IUserRepository;
  private prisma: PrismaClient;
  private bcrypt: IBcryptAdapter;

  constructor(
    UserRepository: IUserRepository,
    prisma: PrismaClient,
    bcrypt: IBcryptAdapter
  ) {
    this.UserRepository = UserRepository;
    this.prisma = prisma;
    this.bcrypt = bcrypt;
  }

  public async createRandomUser() {
    let email = await this.createNewEmail();

    const alreadyExist = await this.validateIfEmailAlreadyExist(email);

    while (alreadyExist) {
      email = await this.createNewEmail();
    }

    const password = await this.createNewPassword();
    const hashPassword = await this.bcrypt.hashPassword(password);

    const newUser = await this.create({ password: hashPassword, email });

    return { ...newUser, password };
  }

  private async create({ password, email }: IUserCreate) {
    const newUser = await this.UserRepository.create(
      { password, email },
      { prisma: this.prisma }
    );

    return newUser;
  }

  private async createNewEmail() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const emailLength = Math.floor(Math.random() * 7) + 6;

    let email = "user-";

    for (let i = 0; i < emailLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      email += characters.charAt(randomIndex);
    }

    email += "@techMeets.com";

    return email;
  }

  private async validateIfEmailAlreadyExist(email: string) {
    const alreadyExist = await this.UserRepository.validateIfEmailExists(
      email,
      { prisma: this.prisma }
    );

    return alreadyExist;
  }

  private async createNewPassword() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const passwordLength = 15;

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    return password;
  }
}

export { UserService };
