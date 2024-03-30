import { Request, Response } from "express";
import AccountServiceClass from "../services/account.service";

const AccountService = new AccountServiceClass();

const JobsControllers = {
  // CREATE job by HR
  createJob: async (req: Request, res: Response): Promise<any> => {
    const { title, deadline, description } = req.body;

    // CHECK IF ALL REQUIRED FIELDS ARE PROVIDED
    if (!title || !deadline || !deadline || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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

export default JobsControllers;
