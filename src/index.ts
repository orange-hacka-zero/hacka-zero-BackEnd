import app from "@/server";
import dontenv from "dotenv";
import "@config/createAdminUser";
dontenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
