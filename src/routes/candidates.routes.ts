import express from "express";
import CandidatesController from "../controllers/candidates.controller";

const CandidatesRoutes = express.Router();

CandidatesRoutes.post("/apply/:jobId", CandidatesController.Apply);

export default CandidatesRoutes;
