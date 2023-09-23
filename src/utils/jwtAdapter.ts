import { iJwtPayload } from "@/interfaces/jwt";
import jwt from "jsonwebtoken";

export class JwtAdapter {
  constructor(private readonly secret: string) {}

  async sign(payload: iJwtPayload): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: "1d",
    });
  }

  async verify(token: string): Promise<unknown> {
    return jwt.verify(token, this.secret);
  }
}
