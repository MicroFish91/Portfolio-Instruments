import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import { passportAuthInit } from "./auth";
// import db from "./models";
import { combineRouter } from "./routes";
import { initCronJobs } from "./startup/cronJobs";
import { initSeedData } from "./startup/seedData";
// import { resetMainDemoUser } from "./utils/dbUtils/routineMaintenance";
// import { seedMigrator } from "./utils";

const app = express();

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

// Startup
app.use(helmet());
app.use(passport.initialize());
passportAuthInit();
initCronJobs();
initSeedData();
// resetMainDemoUser();

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
combineRouter(app);
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
