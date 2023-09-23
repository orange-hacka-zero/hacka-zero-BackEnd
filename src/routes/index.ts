import { Router } from "express";
import { userRouter } from "./userRoute";

const router = Router();

router.get("/", (_req, res) => {
  res.send("ok");
});

router.use("/user", userRouter);

export default router;
