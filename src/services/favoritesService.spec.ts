import { FavoritesService } from "@/services/favoritesService";
import {
  IFavoritesRepository,
  IFavoritesService,
} from "@/interfaces/favorites";

const favoritesRepositoryMock = {
  create: jest.fn(),
  getFavorites: jest.fn(),
  delete: jest.fn(),
};

describe("Testing favorites service", () => {
  let favoritesService: IFavoritesService;

  beforeEach(() => {
    const favoritesRepository = favoritesRepositoryMock as IFavoritesRepository;
    favoritesService = new FavoritesService(favoritesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new favorite", async () => {
    const userId = "123";
    const eventId = "456";

    favoritesRepositoryMock.create.mockResolvedValue({ userId, eventId });

    const newFavorite = await favoritesService.create(userId, eventId);

    expect(newFavorite).toEqual({ userId, eventId });
    expect(favoritesRepositoryMock.create).toHaveBeenCalledWith(
      userId,
      eventId
    );
  });

  it("should get favorites for a user", async () => {
    const userId = "123";
    const favoritesData = [{ userId, eventId: "456" }];

    favoritesRepositoryMock.getFavorites.mockResolvedValue(favoritesData);

    const favorites = await favoritesService.getFavorites(userId);

    expect(favorites).toEqual(favoritesData);
    expect(favoritesRepositoryMock.getFavorites).toHaveBeenCalledWith(userId);
  });

  it("should delete a favorite", async () => {
    const userId = "123";
    const eventId = "456";

    await favoritesService.delete(userId, eventId);

    expect(favoritesRepositoryMock.delete).toHaveBeenCalledWith(
      userId,
      eventId
    );
  });
});
