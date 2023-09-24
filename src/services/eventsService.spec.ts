import { EventsService } from "@/services/eventsService";
import { IEventData, IEventEdit, IEventsRepository } from "@/interfaces/events";

const eventsRepositoryMock = {
  create: jest.fn(),
  findUniqueById: jest.fn(),
  getAllEvents: jest.fn(),
  updateEvent: jest.fn(),
  deleteEvent: jest.fn(),
};

describe("Testing event service module", () => {
  let eventsService: EventsService;
  const eventRepository = eventsRepositoryMock as unknown as IEventsRepository;

  beforeEach(() => {
    eventsService = new EventsService(eventRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new event", async () => {
    const eventData: IEventData = {
      date: new Date(),
      description: "Evento de teste",
      name: "Teste",
      link: "orangeJuice.com",
      modalities: "ONLINE",
      address: "Rua dos testes, 123",
      paymentType: "FREE",
    };

    eventsRepositoryMock.create.mockResolvedValue(eventData);

    const newEvent = await eventsService.create(eventData);

    expect(newEvent).toEqual(eventData);
    expect(eventsRepositoryMock.create).toHaveBeenCalledWith(eventData);
  });

  it("should find a unique event by ID", async () => {
    const eventId = "123";

    const eventData: IEventData = {
      date: new Date(),
      description: "Evento de teste",
      name: "Teste",
      link: "orangeJuice.com",
      modalities: "ONLINE",
      address: "Rua dos testes, 123",
      paymentType: "FREE",
    };

    eventsRepositoryMock.findUniqueById.mockResolvedValue(eventData);

    const event = await eventsService.findUniqueById(eventId);

    expect(event).toEqual(eventData);
    expect(eventsRepositoryMock.findUniqueById).toHaveBeenCalledWith(eventId);
  });

  it("should get all events", async () => {
    const eventsData: IEventData[] = [
      {
        date: new Date(),
        description: "Evento de teste",
        name: "Teste",
        link: "orangeJuice.com",
        modalities: "ONLINE",
        address: "Rua dos testes, 123",
        paymentType: "FREE",
      },

      {
        date: new Date(),
        description: "Evento de teste 22",
        name: "Teste 52",
        link: "orangeJuice.com.br",
        modalities: "HYBRID",
        address: "Rua dos testes, 123",
        paymentType: "PAID",
      },
    ];

    eventsRepositoryMock.getAllEvents.mockResolvedValue(eventsData);

    const events = await eventsService.getAllEvents();

    expect(events).toEqual(eventsData);
    expect(eventsRepositoryMock.getAllEvents).toHaveBeenCalled();
  });

  it("should update an event", async () => {
    const eventEditData: IEventEdit = {
      id: "1",
      date: new Date(),
      description: "Evento de teste",
      name: "Teste",
      link: "orangeJuice.com",
      modalities: "ONLINE",
      address: "Rua dos testes, 123",
      paymentType: "FREE",
    };

    eventsRepositoryMock.updateEvent.mockResolvedValue(eventEditData);

    const updatedEvent = await eventsService.updateEvent(eventEditData);

    expect(updatedEvent).toEqual(eventEditData);
    expect(eventsRepositoryMock.updateEvent).toHaveBeenCalledWith(
      eventEditData
    );
  });

  it("should delete an event", async () => {
    const eventId = "1";

    eventsRepositoryMock.findUniqueById.mockResolvedValue({});
    eventsRepositoryMock.deleteEvent.mockResolvedValue({});

    const deletedEvent = await eventsService.deleteEvent(eventId);

    expect(deletedEvent).toEqual({});
    expect(eventsRepositoryMock.findUniqueById).toHaveBeenCalledWith(eventId);
    expect(eventsRepositoryMock.deleteEvent).toHaveBeenCalledWith(eventId);
  });

  it("should throw an error when trying to find event non-existent", async () => {
    const eventId = "3";

    eventsRepositoryMock.findUniqueById.mockResolvedValue(null);

    await expect(eventsService.findUniqueById(eventId)).rejects.toThrowError(
      "Evento não encontrado"
    );
  });

  it("should throw an error when trying to delete a non-existent event", async () => {
    const eventId = "3";

    eventsRepositoryMock.findUniqueById.mockResolvedValue(null);

    await expect(eventsService.deleteEvent(eventId)).rejects.toThrowError(
      "Evento não encontrado"
    );
  });
});
