import dotenv from "dotenv";
import path from "path";

const dir = import.meta.dirname;

dotenv.config({ path: path.join(dir, "config.env") });

/* "start": "nodemon --env-file=config.env server.js" */

import app from "./src/app.js";
import { dbConnect } from "./src/config/dbConnection.js";

const conStr = process.env.DB_URL.replace(
  "<db_password>",
  process.env.DB_PASSWORD,
);

async function startServer() {
  try {
    await dbConnect(conStr);
    app.listen(process.env.PORT || 300, () =>
      console.log(`Server connection successful`),
    );
  } catch (error) {
    console.log(`Server connection failed: ${error.message}`);
  }
}

startServer();
