export interface iJwtPayload {
  id: string;
  role: "USER" | "ADMIN";
}

export interface iJwtAdapter {
  sign(payload: iJwtPayload): Promise<string>;
  verify(token: string): Promise<unknown>;
}
