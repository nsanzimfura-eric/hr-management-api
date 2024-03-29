import express from "express";
import AccountController from "../controllers/account.controller";

const AccountRoutes = express.Router();

// authentication --------------------
AccountRoutes.post("/login", AccountController.login);

//super_admin or an other admin creates an admin using queries
AccountRoutes.post("/signup", AccountController.create);

export default AccountRoutes;
