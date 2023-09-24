import { Router } from "express";
import { userRouter } from "./userRoute";
import { authRoute } from "./authRoute";
import { eventsRouter } from "./eventsRoute";

const router = Router();

router.get("/", (_req, res) => {
  res.send("ok");
});

router.use("/user", userRouter);
router.use("/auth", authRoute);
router.use("/events", eventsRouter);

export default router;
