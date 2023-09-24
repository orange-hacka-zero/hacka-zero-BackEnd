import { IEventData, IEventEdit } from "./eventsRepository";

export interface IEventsService {
  create(data: IEventData): Promise<unknown>;
  findUniqueById(id: string): Promise<unknown>;
  getAllEvents(): Promise<unknown>;
  updateEvent(data: IEventEdit): Promise<unknown>;
}
