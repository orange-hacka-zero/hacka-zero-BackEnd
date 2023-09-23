export interface IJwtPayload {
  id: string;
  role: "USER" | "ADMIN";
}

export interface IVerifyResult {
  id: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
}

export interface IJwtAdapter {
  sign(payload: IJwtPayload): Promise<string>;
  verify(token: string): Promise<IVerifyResult>;
}
