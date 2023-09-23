import { IAuthService } from "@/interfaces/auth";
import { Request, Response } from "express";

class AuthController {
  private authService: IAuthService;
  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const result = await this.authService.login(email, password);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ message: "Ocorreu um erro no login" });
    }
  }
}

export { AuthController };
