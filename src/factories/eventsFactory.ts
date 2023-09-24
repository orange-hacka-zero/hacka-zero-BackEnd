import { EventsController } from "@/controllers/eventsController";
import { EventsService } from "@/services/eventsService";
import { prisma } from "@database/client";
import { EventsRepository } from "@/repositories/eventsRepository";

const EventsControllerFactory = (): EventsController => {
  const cxt = {
    prisma,
  };
  const eventsRepository = new EventsRepository(cxt);
  const eventsService = new EventsService(eventsRepository);
  const eventsController = new EventsController(eventsService);

  return eventsController;
};

export { EventsControllerFactory };
