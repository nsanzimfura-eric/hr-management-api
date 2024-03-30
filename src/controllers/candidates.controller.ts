import { Request, Response } from "express";
import CandidateService from "../services/candidates.service";

const candidateServices = new CandidateService();

const CandidatesController = {
  Apply: async (req: any, res: Response): Promise<any> => {
    const { jobId } = req.params;
    const { name, email, phone, github, linkedin, web } = req.body;
    //candidate resume
    const resume = req.file;

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
      // CHECK IF USER EXISTS
      const doesEmailExist = await candidateServices.findCandidateByEmail(
        lowerCaseEmail
      );

      // IF EMAIL EXISTS
      if (doesEmailExist) {
        //update jobs to add candidate
      }

      // CREATE USER

      // RETURN RESPONSE
      return res.status(201).json({
        success: true,
        data: {
          password: undefined,
        },
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
