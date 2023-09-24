import { Router } from "express";
import { EventsControllerFactory } from "@/factories/eventsFactory";
import { isAdminMiddleware } from "@/middlewares/isAdminMiddleware";
import { AuthenticationRequest } from "@/interfaces/express";
import { AuthMiddlewareFactory } from "@/factories/authMiddlewareFactor";

const eventsRouter = Router();

eventsRouter.post(
  "/create",
  (request: AuthenticationRequest, response, next) => {
    return AuthMiddlewareFactory().authenticate(request, response, next);
  },
  isAdminMiddleware,
  (req, res) => {
    return EventsControllerFactory().create(req, res);
  }
);

eventsRouter.get("/get_all", (req, res) => {
  return EventsControllerFactory().getAllEvents(req, res);
});

eventsRouter.get("/:id", (req, res) => {
  return EventsControllerFactory().findUniqueById(req, res);
});

eventsRouter.put(
  "/update",
  (request: AuthenticationRequest, response, next) => {
    return AuthMiddlewareFactory().authenticate(request, response, next);
  },
  isAdminMiddleware,
  (req, res) => {
    return EventsControllerFactory().updateEvent(req, res);
  }
);

eventsRouter.delete(
  "/delete/:id",
  (request: AuthenticationRequest, response, next) => {
    return AuthMiddlewareFactory().authenticate(request, response, next);
  },
  isAdminMiddleware,
  (req, res) => {
    return EventsControllerFactory().deleteEvent(req, res);
  }
);

export { eventsRouter };
