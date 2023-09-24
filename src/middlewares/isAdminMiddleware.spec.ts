import { isAdminMiddleware } from "@/middlewares/isAdminMiddleware";
import { AuthenticationRequest } from "@/interfaces/express";
import { Response, NextFunction } from "express";

describe("Testing the middleware isAdminMiddleware", () => {
  it("should pass when user is an admin", () => {
    const req = {
      auth: { role: "ADMIN" },
    } as AuthenticationRequest;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    isAdminMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return a 401 error when user is not an admin", () => {
    const req = {
      auth: { role: "USER" },
    } as AuthenticationRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    isAdminMiddleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Acesso negado" });
  });

  it("should return a 401 error when auth is missing", () => {
    const req = {} as AuthenticationRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    isAdminMiddleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Acesso negado" });
  });
});
