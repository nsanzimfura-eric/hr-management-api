import { Request, Response } from "express";
import AccountServiceClass from "../services/account.service";

const AccountService = new AccountServiceClass();

const CandidatesController = {
  // CREATE ADMIN
  create: async (req: Request, res: Response): Promise<any> => {
    const { firstName, lastName, email, password } = req.body;

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

  // LOGIN
  login: async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password!)
      return res.status(400).json({
        success: false,
        message: "Email and password are required!",
      });

    const lowerCaseEmail = email.trim().toLowerCase();

    const userByEmail = await AccountService.findUserByEmail(lowerCaseEmail);

    if (!userByEmail)
      return res.status(404).json({
        success: false,
        message: "User with the email not found",
      });

    try {
      const data = await AccountService.login(userByEmail, password);

      if (!data)
        return res.status(400).json({
          success: false,
          message: "Email or password not correct",
        });

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default CandidatesController;
