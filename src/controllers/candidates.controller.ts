import { Request, Response } from "express";
import AccountServiceClass from "../services/account.service";

const AccountService = new AccountServiceClass();

const CandidatesController = {
  // CREATE ADMIN
  Apply: async (req: Request, res: Response): Promise<any> => {
    const { jobId } = req.params;
    const { name, lastName, email, password } = req.body;

    // CHECK IF ALL REQUIRED FIELDS ARE PROVIDED
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Names and email are required",
      });
    }

    let lowerCaseEmail = email;
    if (email) {
      lowerCaseEmail = email.trim().toLowerCase();

      // CHECK IF USER EXISTS
      const doesEmailExist = await AccountService.findUserByEmail(
        lowerCaseEmail
      );

      // IF EMAIL EXISTS
      if (doesEmailExist)
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
    }

    try {
      // CREATE USER
      const user = await AccountService.createUser(
        firstName,
        lastName,
        lowerCaseEmail,
        password
      );

      // RETURN RESPONSE
      return res.status(201).json({
        success: true,
        data: {
          ...user,
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
