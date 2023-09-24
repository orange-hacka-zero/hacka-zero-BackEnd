/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBcryptAdapter } from "@/interfaces/bcrypt";

class MockBcryptAdapter implements IBcryptAdapter {
  async hashPassword(_password: string): Promise<string> {
    return "mocked-hash";
  }

  async comparePassword(_password: string, _hash: string): Promise<boolean> {
    return true;
  }
}

export { MockBcryptAdapter };
