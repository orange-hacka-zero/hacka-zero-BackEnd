import { Router } from "express";
import { userRouter } from "./userRoute";
import { authRoute } from "./authRoute";
import { eventsRouter } from "./eventsRoute";
import { favoritesRouter } from "./favoritesRoute";

const router = Router();

router.get("/", (_req, res) => {
  res.send("ok");
});

router.use("/user", userRouter);
router.use("/auth", authRoute);
router.use("/events", eventsRouter);
router.use("/favorites", favoritesRouter);

export default router;
