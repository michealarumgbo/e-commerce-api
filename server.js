import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server Could not start. Error: " + error);
    process.exit(1);
  }
};

await startServer();
