/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserService } from "@/services/userService";
import { iUserService } from "@/interfaces/user";
import { MockBcryptAdapter } from "@/utils/mock/mockBcryptAdapter";
import { MockUserRepository } from "@/repositories/mock/mockUserRepository";

let userService: iUserService;

beforeEach(() => {
  const mockUserRepository = new MockUserRepository();
  const userRepository = mockUserRepository.getUserRepository();
  const ctx = mockUserRepository.getCtx();
  const bcryptAdapter = new MockBcryptAdapter();
  userService = new UserService(userRepository, ctx.prisma, bcryptAdapter);
});

describe("Testing Create user service", () => {
  test("should create a new user", async () => {
    const createNewEmailSpy = jest.spyOn(userService as any, "createNewEmail");
    const validateIfEmailAlreadyExistSpy = jest.spyOn(
      userService as any,
      "validateIfEmailAlreadyExist"
    );
    const createNewPasswordSpy = jest.spyOn(
      userService as any,
      "createNewPassword"
    );

    //given
    createNewEmailSpy.mockReturnValue("mocked-email");
    validateIfEmailAlreadyExistSpy.mockReturnValue(false);
    createNewPasswordSpy.mockReturnValue("mocked-password");

    // when
    const user = await userService.createRandomUser();

    // then
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("password");
    expect(createNewEmailSpy).toHaveBeenCalled();
    expect(validateIfEmailAlreadyExistSpy).toHaveBeenCalled();
    expect(createNewPasswordSpy).toHaveBeenCalled();

    createNewEmailSpy.mockRestore();
    validateIfEmailAlreadyExistSpy.mockRestore();
    createNewPasswordSpy.mockRestore();
  });
});
