require("dotenv").config();
const connectionServer = require("./config/serverConfig");
const connectionDB = require("./config/dbConfig");

const app = connectionServer();

const host = process.env.HOSTNAME || "0.0.0.0";
const port = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
    await connectionDB();

    app.listen(port, host, () => {
      console.log(`Server started on http://${host}:${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
