import { Request } from "express";

interface AuthenticationRequest extends Request {
  auth?: {
    id: string;
    role: "USER" | "ADMIN";
  };
}

export { AuthenticationRequest };
