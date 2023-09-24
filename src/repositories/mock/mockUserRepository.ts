import { MockContext, createMockContext, Context } from "@database/mock/client";
import { UserRepository } from "@repositories/userRepository";
import { Role } from "@prisma/client";
import { IUserRepository } from "@/interfaces/user";

class MockUserRepository {
  private mockCtx: MockContext;
  private ctx: Context;
  private userRepository: IUserRepository;

  constructor() {
    this.mockCtx = createMockContext();
    this.ctx = this.mockCtx as unknown as Context;
    this.userRepository = new UserRepository();
    this.createMock();
  }

  private createMock() {
    this.mockCtx.prisma.user.create.mockResolvedValue({
      id: "1",
      email: "user-6qtL9oFTsbek@techMeets.com",
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: "123456",
    });
  }

  public getUserRepository() {
    return this.userRepository;
  }

  public getCtx() {
    return this.ctx;
  }
}

export { MockUserRepository };
