import { IBcryptAdapter } from "@/interfaces/bcrypt";
import { IUserRepository } from "@/interfaces/user";
import { IJwtAdapter } from "@/interfaces/jwt";
import { PrismaClient } from "@prisma/client";
import { IAuthService } from "@/interfaces/auth";

class AuthService implements IAuthService {
  private jwtAdapter: IJwtAdapter;
  private prisma: PrismaClient;
  private bcrypt: IBcryptAdapter;
  private userRepository: IUserRepository;

  constructor(
    jwtAdapter: IJwtAdapter,
    prisma: PrismaClient,
    bcrypt: IBcryptAdapter,
    UserRepository: IUserRepository
  ) {
    this.jwtAdapter = jwtAdapter;
    this.prisma = prisma;
    this.bcrypt = bcrypt;
    this.userRepository = UserRepository;
  }

  public async login(email: string, password: string) {
    this.validateFields(email, password);

    const user = await this.userRepository.getUserByEmail(email, {
      prisma: this.prisma,
    });

    if (!user) throw new Error("Email ou senha incorretos");

    const isValidPassword = await this.bcrypt.comparePassword(
      password,
      user.password
    );

    if (!isValidPassword) throw new Error("Email ou senha incorretos");

    const token = await this.jwtAdapter.sign({
      id: user.id,
      role: user.role,
    });

    return { token, user: { id: user.id, role: user.role } };
  }

  private validateFields(email: string, password: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{15,}$/;

    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios");
    }

    if (!emailRegex.test(email)) {
      throw new Error("Email inválido");
    }

    if (!passwordRegex.test(password)) {
      throw new Error(
        "Senha inválida. A senha deve conter  15 caracteres, incluindo letras e números."
      );
    }

    return true;
  }
}

export { AuthService };
