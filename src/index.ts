import "express-async-errors";
import express from "express";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middlewares/error";
import routes from "./routes";
// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use(express.static("public"));

  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1", routes);

  app.use(errorMiddleware);
  console.log(`running in localhost:${process.env.PORT}`);
  return app.listen(process.env.PORT);
});
