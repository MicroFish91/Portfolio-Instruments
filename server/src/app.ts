import compression from "compression";
import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import { passportAuthInit } from "./auth";
import { errorMiddleware } from "./middleware";
// import db from "./models";
import { combineRouter } from "./routes";
import { initCronJobs } from "./startup/cronJobs";
import { initProcessErrorHandler } from "./startup/processErrorHandler";
// import { initSeedData } from "./startup/seedData";
// import { seedFullCustomUser } from "./utils/dbUtils/routineMaintenance/FullCustomUserSeed";

const app = express();

// Startup
app.use(helmet());
app.use(compression());
initProcessErrorHandler();
// seedFullCustomUser("hello_world2@gmail.com");
initCronJobs();
// initSeedData();
passportAuthInit();
app.use(passport.initialize());

// Morgan
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

// Cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
combineRouter(app);

// Err Handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

/*
 * **************  MISC REF *********************
 */

// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// });

// Seed Database
// seedMigrator();
