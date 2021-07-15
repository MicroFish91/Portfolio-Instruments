import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
