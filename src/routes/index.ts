import express from "express";
import AccountRoutes from "./account.routes";
import CandidatesRoutes from "./candidates.routes";
import JobsRoutes from "./jobs.routes";

const router = express.Router();

router.use("/auth", AccountRoutes);
router.use("/jobs", JobsRoutes);
router.use("/candidates", CandidatesRoutes);

router.use("*", (req, res) => {
  res.status(404).json({
    code: 404,
    message: "Not Found",
  });
});

export default router;
