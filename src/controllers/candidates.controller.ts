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
    const { file } = req;
    // CHECK IF ALL REQUIRED FIELDS ARE PROVIDED
    if (!name || !file || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Resume,name, email, and phone are required",
      });
    }
    //only allow pdf files
    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only pdf files plz",
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
      // CHECK IF Candidate EXISTS
      const doesEmailExist = await candidateServices.findCandidateByEmail(
        lowerCaseEmail
      );

      // check if user has applied to this job before, he is in the jobs candidates;
      if (doesEmailExist) {
        const hasUserApplied = doesJobExists.candidates?.some(
          (candidate) => candidate.id === doesEmailExist.id
        );
        if (hasUserApplied) {
          return res.status(400).json({
            success: false,
            message: "You have already applied to this job",
          });
        }
      }

      //upload to resume cloudinary
      const base64String = file.buffer.toString("base64");
      const fileBase64 = `data:${file.mimetype};base64,${base64String}`;
      const result = await cloudinary.uploader.upload(fileBase64);
      const neededResume: string = result.secure_url;

      let data: any = null;
      if (doesEmailExist) {
        await candidateServices.updateCandidate(
          doesEmailExist,
          phone,
          github,
          linkedin,
          web,
          neededResume,
          doesJobExists
        );
      } else {
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
