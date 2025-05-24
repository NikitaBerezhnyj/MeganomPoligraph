const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const userRoutes = require("../routes/userRoutes");
const adminRoutes = require("../routes/adminRoutes");
const uploadRoutes = require("../routes/uploadRoutes");
const translateRoutes = require("../routes/translateRoutes");

const createServer = () => {
  const app = express();

  const requiredEnvVars = [
    "PORT",
    "HOSTNAME",
    "ORIGIN_WEBSITE",
    "DB",
    "SALT",
    "JWT_PRIVATE_TOKEN",
    "EMAIL",
    "PASSWORD"
  ];

  const missingVars = requiredEnvVars.filter(key => !process.env[key]);

  if (missingVars.length > 0) {
    console.error(
      `Missing necessary environment variables: ${missingVars.join(", ")}`
    );
    process.exit(1);
  }

  app.use(
    // cors({ origin: process.env.ORIGIN_WEBSITE || "http://localhost:5173" })
    cors({ origin: "*" })
  );
  app.use(express.json());

  app.use("/api", userRoutes);
  app.use("/api", adminRoutes);
  app.use("/api", uploadRoutes);
  app.use("/api", translateRoutes);

  app.use("/uploads", express.static("uploads"));

  app.use(helmet.frameguard({ action: "DENY" }));

  app.use(express.static(path.join(__dirname, "..", "..", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
  });

  return app;
};

module.exports = createServer;
