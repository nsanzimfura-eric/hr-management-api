import express from "express";
import CandidatesController from "../controllers/candidates.controller";

const CandidatesRoutes = express.Router();

CandidatesRoutes.post("/login", CandidatesController.login);

CandidatesRoutes.post("/signup", CandidatesController.create);

export default CandidatesRoutes;
