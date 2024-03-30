import express from "express";
import multer from "multer";
import CandidatesController from "../controllers/candidates.controller";

const CandidatesRoutes = express.Router();

// SETUP MULTER
const storage = multer.memoryStorage();
const upload = multer({ storage });

CandidatesRoutes.post(
  "/apply/:jobId",
  upload.single("file"),
  CandidatesController.Apply
);

export default CandidatesRoutes;
