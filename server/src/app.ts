import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import { passportAuthInit } from "./auth";
// import db from "./models";
import { combineRouter } from "./routes";
// import { seedMigrator } from "./utils";

const app = express();
app.use(helmet());

// Morgan
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize Passport Auth
app.use(passport.initialize());
passportAuthInit();

// Routes
combineRouter(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// });

// Seed Database
// seedMigrator();
