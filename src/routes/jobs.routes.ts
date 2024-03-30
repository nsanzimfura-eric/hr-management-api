import express from "express";
import JobsControllers from "../controllers/jobs.controller";

const JobsRoutes = express.Router();

JobsRoutes.post("/login", JobsControllers.login);

JobsRoutes.post("/signup", JobsControllers.create);

export default JobsRoutes;
