import { IEventData, IEventEdit, IEventsRepository } from "@/interfaces/events";

class EventsService {
  private eventsRepository: IEventsRepository;

  constructor(eventsRepository: IEventsRepository) {
    this.eventsRepository = eventsRepository;
  }

  public async create(data: IEventData) {
    const newEvent = await this.eventsRepository.create(data);

    return newEvent;
  }

  public async findUniqueById(id: string) {
    const event = await this.eventsRepository.findUniqueById(id);

    if (!event) {
      throw new Error("Evento não encontrado");
    }

    return event;
  }

  public async getAllEvents() {
    const events = await this.eventsRepository.getAllEvents();

    return events;
  }

  public async updateEvent(data: IEventEdit) {
    const updatedEvent = await this.eventsRepository.updateEvent(data);

    return updatedEvent;
  }

  public async deleteEvent(id: string) {
    const event = await this.eventsRepository.findUniqueById(id);

    if (!event) {
      throw new Error("Evento não encontrado");
    }

    const deletedEvent = await this.eventsRepository.deleteEvent(id);

    return deletedEvent;
  }
}

export { EventsService };
