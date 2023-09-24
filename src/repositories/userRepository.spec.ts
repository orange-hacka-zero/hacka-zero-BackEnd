import { MockContext, createMockContext, Context } from "@database/mock/client";
import { UserRepository } from "@repositories/userRepository";
import { Role } from "@prisma/client";

let mockCtx: MockContext;
let ctx: Context;
let userRepository: UserRepository;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
  userRepository = new UserRepository();
});

describe("Testing user repository module", () => {
  test("should create a new user", async () => {
    const user = {
      id: "1",
      email: "john-doe@gmail.com",
      password: "123456",
      createdAt: new Date(),
      updatedAt: new Date(),
      role: Role.USER,
    };

    mockCtx.prisma.user.create.mockResolvedValue(user);
    await expect(
      userRepository.create(
        {
          email: "john-doe@gmail.com",
          password: "123456",
        },
        ctx
      )
    ).resolves.toEqual({
      ...user,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      id: "1",
    });
  });

  test("should validate error when create a new user", async () => {
    mockCtx.prisma.user.create.mockRejectedValue(new Error("Error"));
    await expect(
      userRepository.create(
        {
          email: "",
          password: "123456",
        },
        ctx
      )
    ).rejects.toThrowError("Error");
  });

  test("should validate if email already exist", async () => {
    const user = {
      id: "1",
      email: "john-doe@gmail.com",
      password: "123456",
      createdAt: new Date(),
      updatedAt: new Date(),
      role: Role.USER,
    };

    mockCtx.prisma.user.findUnique.mockResolvedValue(user);
    await expect(
      userRepository.validateIfEmailExists("john-doe@gmail.com", ctx)
    ).resolves.toBeTruthy();
  });

  test("should validate if email does not exist", async () => {
    mockCtx.prisma.user.findUnique.mockResolvedValue(null);
    await expect(
      userRepository.validateIfEmailExists("john-doe@gmail.com1", ctx)
    ).resolves.toBeFalsy();
  });
});
