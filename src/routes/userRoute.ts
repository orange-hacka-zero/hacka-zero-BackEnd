import { Router } from "express";
import { UserControllerFactory } from "@/factories/userFactorie";

const userRouter = Router();

userRouter.post("/new_account", (req, res) => {
  return UserControllerFactory().create(req, res);
});

export { userRouter };
