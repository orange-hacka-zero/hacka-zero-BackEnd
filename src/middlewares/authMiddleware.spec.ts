import { AuthMiddleware } from "@/middlewares/authMiddleware";
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "@/interfaces/user";
import { IJwtAdapter } from "@/interfaces/jwt";
import { Response, NextFunction } from "express";
import { AuthenticationRequest } from "@/interfaces/express";

describe("Testing the middleware  AuthMiddleware", () => {
  let authMiddleware: AuthMiddleware;

  const jwtAdapterMock = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const userRepositoryMock = {
    getUserById: jest.fn(),
  };

  beforeEach(() => {
    const jwtAdapter = jwtAdapterMock as unknown as IJwtAdapter;
    const prismaMock = new PrismaClient();
    const userRepository = userRepositoryMock as unknown as IUserRepository;

    authMiddleware = new AuthMiddleware(jwtAdapter, prismaMock, userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should pass when authorization header is valid", async () => {
    const req = {
      headers: { authorization: "Bearer valid_token" },
    } as AuthenticationRequest;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    jwtAdapterMock.verify.mockResolvedValue({ id: "1", role: "user" });
    userRepositoryMock.getUserById.mockResolvedValue({ id: "1", role: "user" });

    await authMiddleware.authenticate(req, res, next);

    expect(req.auth).toEqual({ id: "1", role: "user" });
    expect(next).toHaveBeenCalled();
  });

  it("should return a 401 error when authorization header is missing", async () => {
    const req = {
      headers: {},
    } as AuthenticationRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await authMiddleware.authenticate(req, res, next);

    expect(req.auth).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Autorização inválida" });
  });

  it("should return a 401 error when authorization header is invalid", async () => {
    const req = {
      headers: { authorization: "InvalidHeader" },
    } as AuthenticationRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await authMiddleware.authenticate(req, res, next);

    expect(req.auth).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Autorização inválida" });
  });

  it("should return a 401 error when token verification fails", async () => {
    const req = {
      headers: { authorization: "Bearer invalid_token" },
    } as AuthenticationRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    jwtAdapterMock.verify.mockRejectedValue(
      new Error("Token verification failed")
    );

    await authMiddleware.authenticate(req, res, next);

    expect(req.auth).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Autorização inválida" });
  });

  it("should return a 401 error when user is not found", async () => {
    const req = {
      headers: { authorization: "Bearer valid_token" },
    } as AuthenticationRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    jwtAdapterMock.verify.mockResolvedValue({ id: "1", role: "user" });
    userRepositoryMock.getUserById.mockResolvedValue(null);

    await authMiddleware.authenticate(req, res, next);

    expect(req.auth).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Autorização inválida" });
  });
});
