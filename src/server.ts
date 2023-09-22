import express from "express";
import cors from "cors";
import dontenv from "dotenv";
import router from "@routes";
dontenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

export default app;
