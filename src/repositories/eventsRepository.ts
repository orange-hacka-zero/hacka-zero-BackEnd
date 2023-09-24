import { Context } from "@/database/mock/client";
import { IEventData, IEventEdit, IEventsRepository } from "@/interfaces/events";

class EventsRepository implements IEventsRepository {
  private ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  public async create(data: IEventData) {
    const newEvent = await this.ctx.prisma.events.create({
      data: {
        name: data.name,
        description: data.description,
        link: data.link,
        modalities: data.modalities,
        paymentType: data.paymentType,
        address: data.address,
        date: new Date(data.date),
      },
    });

    return newEvent;
  }

  public async findUniqueById(id: string) {
    const event = await this.ctx.prisma.events.findUnique({
      where: {
        id,
      },
    });

    return event;
  }

  public async getAllEvents() {
    const events = await this.ctx.prisma.events.findMany();

    return events;
  }

  public async updateEvent(data: IEventEdit) {
    const updatedEvent = await this.ctx.prisma.events.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.id,
        description: data.description,
        link: data.link,
        modalities: data.modalities,
        paymentType: data.paymentType,
        address: data.address,
        date: new Date(data.date),
      },
    });

    return updatedEvent;
  }

  public async deleteEvent(id: string) {
    const deletedEvent = await this.ctx.prisma.events.delete({
      where: {
        id,
      },
    });

    return deletedEvent;
  }
}

export { EventsRepository };
