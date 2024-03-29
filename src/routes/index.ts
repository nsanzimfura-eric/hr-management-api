import express from "express";
import AccountRoutes from "./account.routes";

const router = express.Router();

router.use("/auth", AccountRoutes);

router.use("*", (req, res) => {
  res.status(404).json({
    code: 404,
    message: "Not Found",
  });
});

export default router;
