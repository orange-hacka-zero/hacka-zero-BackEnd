import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import validationMiddleware from "@/middlewares/validationMiddleware";

const app = express();
app.use(express.json());

interface Error {
  status?: number;
  message: string;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ error: err.message });
  return next(err);
});

describe("Validation Middleware", () => {
  it("should pass when request data is valid according to the schema", async () => {
    const validSchema = yup.object().shape({
      name: yup.string().required(),
      age: yup.number().required().positive(),
    });

    app.post("/valid", validationMiddleware(validSchema), (req, res) => {
      res.status(200).json({ message: "Valid data" });
    });

    const response = await request(app)
      .post("/valid")
      .send({ name: "John Doe", age: 25 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Valid data" });
  });

  it("should return a 400 error when request data is invalid according to the schema", async () => {
    const invalidSchema = yup.object().shape({
      email: yup.string().email("Informe um e-mail valido").required(),
    });

    app.post("/invalid", validationMiddleware(invalidSchema), (req, res) => {
      res.json({ message: "Valid data" });
    });

    const response = await request(app)
      .post("/invalid")
      .send({ email: "invalid-email" });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toEqual({
      field: "email",
      message: "Informe um e-mail valido",
    });
  });
});
