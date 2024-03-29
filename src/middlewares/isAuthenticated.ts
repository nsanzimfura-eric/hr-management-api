import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: Error, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Token is invalid or expired" });
    }
    // @ts-ignore
    req.user = decoded;
    next();
  });
};

export default isAuthenticated;
