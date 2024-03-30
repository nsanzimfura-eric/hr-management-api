import express from "express";
import AccountController from "../controllers/account.controller";

const AccountRoutes = express.Router();

// authentication --------------------
AccountRoutes.post("/login", AccountController.login);

AccountRoutes.post("/signup", AccountController.create);

export default AccountRoutes;
