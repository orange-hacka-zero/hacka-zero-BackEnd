import { MockContext, createMockContext, Context } from "@database/mock/client";
import { UserRepository } from "@repositories/userRepository";

let mockCtx: MockContext;
let ctx: Context;
let userRepository: UserRepository;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
  userRepository = new UserRepository();
});

describe("userRepository teste", () => {
  test("should create a new user", async () => {
    const createdAt = new Date();
    const updatedAt = new Date();

    const user = {
      id: "1",
      name: "John Doe",
      email: "john-doe@gmail.com",
      password: "123456",
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    mockCtx.prisma.user.create.mockResolvedValue(user);
    await expect(
      userRepository.create(
        {
          name: "John Doe",
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
});
