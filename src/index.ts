import express from "express";
import cors from "cors";
import dontenv from "dotenv";
import router from "@routes/index";
dontenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
