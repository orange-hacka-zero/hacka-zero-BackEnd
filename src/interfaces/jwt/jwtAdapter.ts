export interface IJwtPayload {
  id: string;
  role: "USER" | "ADMIN";
}

export interface IJwtAdapter {
  sign(payload: IJwtPayload): Promise<string>;
  verify(token: string): Promise<unknown>;
}
