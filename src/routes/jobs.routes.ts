import express from "express";
import JobsControllers from "../controllers/jobs.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const JobsRoutes = express.Router();

JobsRoutes.post("/createJob", isAuthenticated, JobsControllers.createJob);

JobsRoutes.get("/listOfJobs", JobsControllers.getAllJobs);

JobsRoutes.delete("/delete/:jobId", isAuthenticated, JobsControllers.deleteJob);
export default JobsRoutes;
