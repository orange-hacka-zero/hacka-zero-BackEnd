export interface ILoginResult {
  token: string;
  user: { id: string; role: string };
}

export interface IAuthService {
  login(email: string, password: string): Promise<ILoginResult>;
}
