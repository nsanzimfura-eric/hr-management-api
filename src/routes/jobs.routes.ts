import express from "express";
import JobsControllers from "../controllers/jobs.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const JobsRoutes = express.Router();

JobsRoutes.post("/createJob", isAuthenticated, JobsControllers.createJob);
export default JobsRoutes;
