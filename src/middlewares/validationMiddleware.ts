import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

interface ValidationError {
  field?: string;
  message: string;
}

const validationMiddleware = (schema: yup.AnyObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      await schema.validate(body, { abortEarly: false });
      next();
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        const errors: ValidationError[] = error.inner.map(
          (error: yup.ValidationError) => {
            return {
              field: error.path,
              message: error.message,
            };
          }
        );
        return res.status(400).json({ errors });
      }
    }
  };
};

export default validationMiddleware;
