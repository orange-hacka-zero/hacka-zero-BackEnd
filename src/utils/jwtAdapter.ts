import { IJwtPayload, IJwtAdapter, IVerifyResult } from "@/interfaces/jwt";
import jwt from "jsonwebtoken";

export class JwtAdapter implements IJwtAdapter {
  constructor(private readonly secret: string) {}

  async sign(payload: IJwtPayload): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: "1d",
    });
  }

  async verify(token: string): Promise<IVerifyResult> {
    return jwt.verify(token, this.secret) as IVerifyResult;
  }
}
