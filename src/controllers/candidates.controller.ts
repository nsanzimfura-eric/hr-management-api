import { Request, Response } from "express";
import CandidateService from "../services/candidates.service";
import cloudinary from "../config/cloudinary.config";
import JobsServices from "../services/jobs.service";

const candidateServices = new CandidateService();
const jobsServices = new JobsServices();

const CandidatesController = {
  Apply: async (req: any, res: Response): Promise<any> => {
    const { jobId } = req.params;
    const { name, email, phone, github, linkedin, web } = req.body;
    //candidate resume
    const { file: resume } = req;

    // CHECK IF ALL REQUIRED FIELDS ARE PROVIDED
    if (!name || !resume || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Resume,name, email, and phone are required",
      });
    }

    let lowerCaseEmail = email;
    lowerCaseEmail = email.trim().toLowerCase();

    try {
      //does jobExists
      const doesJobExists = await jobsServices.findJobById(jobId);
      if (!doesJobExists) {
        return res.status(404).json({
          success: false,
          message: "Job No longer exists",
        });
      }
      //upload to resume cloudinary
      const result = await cloudinary.uploader.upload(resume.path);
      const neededResume: string = result.secure_url;
      // CHECK IF USER EXISTS
      const doesEmailExist = await candidateServices.findCandidateByEmail(
        lowerCaseEmail
      );
      let data: any = null;
      // IF EMAIL EXISTS
      if (doesEmailExist) {
        //update jobs to add candidate
        // data = await candidateServices.update
      } else {
        // CREATE candidate
        data = await candidateServices.createCandidate(
          name,
          email,
          phone,
          github,
          linkedin,
          web,
          neededResume,
          doesJobExists
        );
      }

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
};

export default CandidatesController;
