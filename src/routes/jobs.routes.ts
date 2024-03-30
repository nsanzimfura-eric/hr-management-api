import express from "express";
import JobsControllers from "../controllers/jobs.controller";
import isAuthenticated from "../middlewares/isAuthenticated";
import optionalAuthentication from "../middlewares/optionalAuthentication";

const JobsRoutes = express.Router();

JobsRoutes.post("/createJob", isAuthenticated, JobsControllers.createJob);

JobsRoutes.get(
  "/listOfJobs",
  optionalAuthentication,
  JobsControllers.getAllJobs
);

JobsRoutes.delete("/delete/:jobId", isAuthenticated, JobsControllers.deleteJob);
export default JobsRoutes;
