import { IEventsService } from "@/interfaces/events";
import { Request, Response } from "express";

class EventsController {
  private eventsService: IEventsService;

  constructor(eventsService: IEventsService) {
    this.eventsService = eventsService;
  }

  public async create(req: Request, res: Response) {
    const data = req.body;

    try {
      const newEvent = await this.eventsService.create(data);

      return res.status(201).json(newEvent);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ocorreu um erro ao criar o evento" });
    }
  }

  public async findUniqueById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const event = await this.eventsService.findUniqueById(id);

      return res.status(200).json(event);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ocorreu um erro ao buscar o evento" });
    }
  }

  public async getAllEvents(req: Request, res: Response) {
    try {
      const events = await this.eventsService.getAllEvents();

      return res.status(200).json(events);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ocorreu um erro ao buscar os eventos" });
    }
  }

  public async updateEvent(req: Request, res: Response) {
    const data = req.body;

    try {
      const updatedEvent = await this.eventsService.updateEvent(data);

      return res.status(200).json(updatedEvent);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ocorreu um erro ao atualizar o evento" });
    }
  }
}

export { EventsController };
