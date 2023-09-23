import { IBcryptAdapter } from "@interfaces/bcrypt";
import bcrypt from "bcrypt";

class BcryptAdapter implements IBcryptAdapter {
  private readonly saltRounds: number;

  constructor(salt: number) {
    this.saltRounds = salt;
  }

  public async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.saltRounds);
    return hash;
  }

  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}

export { BcryptAdapter };
