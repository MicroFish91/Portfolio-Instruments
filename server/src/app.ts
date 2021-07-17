import debug from "debug";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
// import db from "./models";

const app = express();
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
