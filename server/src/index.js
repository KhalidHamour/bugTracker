import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/database.js";
import projectRoutes from "./routes/projects.js";
import bugRoutes from "./routes/bugs.js";
import userRoutes from "./routes/users.js";

const PORT = process.env.PORT || 5000;
const ENV = process.env.ENVIRONMENT;

const app = express();

/*middleWare*/
app.use(express.json());
app.use(express.raw({ extended: false }));
app.use(cors());

/*routes*/
app.use("/projects", projectRoutes);
app.use("/bugs", bugRoutes);
app.use("/users", userRoutes);

/*connnect DB and start server*/
connectDB().then(() =>
  app.listen(PORT, () => {
    ENV === "DEVELOPMENT"
      ? console.log(`server running on port ${PORT}`)
      : undefined;
  })
);
