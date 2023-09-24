import { iUserService } from "@/interfaces/user";
import { Request, Response } from "express";

class UserController {
  private userService: iUserService;
  constructor(userService: iUserService) {
    this.userService = userService;
  }

  public async create(_req: Request, res: Response): Promise<Response> {
    try {
      const newUser = await this.userService.createRandomUser();
      return res.status(201).json(newUser);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ocorreu um erro ao criar usuário" });
    }
  }
}

export { UserController };
