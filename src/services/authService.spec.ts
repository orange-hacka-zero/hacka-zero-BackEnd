/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthService } from "@/services/authService";
import { MockBcryptAdapter } from "@/utils/mock/mockBcryptAdapter";
import { MockUserRepository } from "@/repositories/mock/mockUserRepository";
import { IJwtAdapter } from "@/interfaces/jwt";
import { IUserRepository } from "@/interfaces/user";

let authService: AuthService;

const jwtAdapterMock = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const bcryptAdapterMock = {
  hashPassword: jest.fn(),
  comparePassword: jest.fn(),
};

const userRepositoryMock = {
  getUserByEmail: jest.fn(),
};

beforeEach(() => {
  const mockUserRepository = new MockUserRepository();
  const userRepository = userRepositoryMock as unknown as IUserRepository;
  const ctx = mockUserRepository.getCtx();
  const bcryptAdapter = bcryptAdapterMock as unknown as MockBcryptAdapter;

  authService = new AuthService(
    jwtAdapterMock as IJwtAdapter,
    ctx.prisma,
    bcryptAdapter,
    userRepository
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("testing a  auth service", () => {
  describe("Testing login service ", () => {
    it("should return a token and user when login is successful", async () => {
      const user = {
        id: 1,
        role: "USER",
        password: "hashed_password", // Senha já deve estar hashada
      };

      userRepositoryMock.getUserByEmail.mockResolvedValue(user);
      bcryptAdapterMock.comparePassword.mockResolvedValue(true);
      jwtAdapterMock.sign.mockReturnValue("mocked_token");

      const result = await authService.login(
        "user@example.com",
        "password1234567"
      );

      expect(result).toHaveProperty("token", "mocked_token");
      expect(result).toHaveProperty("user");
      expect(result.user).toHaveProperty("id", user.id);
      expect(result.user).toHaveProperty("role", user.role);

      expect(bcryptAdapterMock.comparePassword).toHaveBeenCalledWith(
        "password1234567",
        "hashed_password"
      );
      expect(jwtAdapterMock.sign).toHaveBeenCalledWith({
        id: user.id,
        role: user.role,
      });
    });

    it("should throw an error when the email or password is incorrect", async () => {
      userRepositoryMock.getUserByEmail.mockResolvedValue(null);
      bcryptAdapterMock.comparePassword.mockResolvedValue(false);

      await expect(
        authService.login("user@example.com", "password1234567")
      ).rejects.toThrowError("Email ou senha incorretos");
    });

    it("should throw an error when email and password are missing", async () => {
      await expect(authService.login("", "")).rejects.toThrowError(
        "Email e senha são obrigatórios"
      );

      await expect(authService.login("", "password")).rejects.toThrowError(
        "Email e senha são obrigatórios"
      );

      await expect(
        authService.login("user@example.com", "")
      ).rejects.toThrowError("Email e senha são obrigatórios");
    });
  });
});
