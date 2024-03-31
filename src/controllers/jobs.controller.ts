import { Response } from "express";
import JobsServices from "../services/jobs.service";
import { UserInterFace } from "../middlewares/isAuthenticated";

const jobsServices = new JobsServices();

const JobsControllers = {
  // CREATE job by HR
  createJob: async (req: UserInterFace, res: Response): Promise<any> => {
    const { title, deadline, description } = req.body;
    const { user: hr } = req; //this is HR who posts a job

    // CHECK IF ALL REQUIRED FIELDS ARE PROVIDED
    if (!title || !deadline || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    try {
      const data = await jobsServices.createJob(
        title,
        description,
        deadline,
        hr.id
      );

      // RETURN RESPONSE
      return res.status(201).json({
        success: true,
        data,
      });

      // ERROR HANDLING
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err?.message,
      });
    }
  },
  //delete job
  deleteJob: async (req: UserInterFace, res: Response): Promise<any> => {
    const { jobId } = req.params;

    try {
      const doesJobExist = await jobsServices.findJobById(jobId);
      if (!doesJobExist) {
        return res.status(404).json({
          success: false,
          message: "Job does not exist",
        });
      }
      await jobsServices.deleteJob(doesJobExist.id);

      // RETURN RESPONSE
      return res.status(200).json({
        success: true,
        data: { message: "Job deleted successfully" },
      });

      // ERROR HANDLING
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err?.message,
      });
    }
  },
  //get all jobs
  getAllJobs: async (_, res: Response): Promise<any> => {
    try {
      const data = await jobsServices.fetchJobs();

      // RETURN RESPONSE
      return res.status(200).json({
        success: true,
        data,
      });

      // ERROR HANDLING
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err?.message,
      });
    }
  },
};

export default JobsControllers;
