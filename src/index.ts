import "dotenv/config";
import "reflect-metadata";
import express, { Application } from "express";
import { AppDataSource } from "./data-source";
import morgan from "morgan";
import routes from "./routes/index";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerDocumentOptions from "./docs/apiDocs";
import runSeeds from "./seeders/index";

const app: Application = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

const port = process.env.APP_PORT || 8080;
const swaggerDocument = swaggerJSDoc(swaggerDocumentOptions);

app.get("/", (req, res) => {
  res.send("Welcome! Head to /docs to view swagger documentation");
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", routes);

app.listen(port, async () => {
  console.log(`App server listening on port ${port}`);
  try {
    await AppDataSource.initialize();
    console.log("Database up and running");
    runSeeds();
  } catch (error) {
    console.log(error);
    console.log("Couldn't connect to database");
  }
});
