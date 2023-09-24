import { Modality, PaymentType } from "@prisma/client";

export interface IEventData {
  name: string;
  description: string;
  link: string;
  modalities: Modality;
  paymentType: PaymentType;
  address?: string;
  date: Date;
}

export interface IEventEdit extends IEventData {
  id: string;
}

export interface IEventsRepository {
  create(data: IEventData): Promise<unknown>;
  findUniqueById(id: string): Promise<unknown>;
  getAllEvents(): Promise<unknown>;
  updateEvent(data: IEventEdit): Promise<unknown>;
  deleteEvent(id: string): Promise<unknown>;
}
