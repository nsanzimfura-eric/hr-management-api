//bellow user can login or not, they will be redirected controllers

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const optionalAuthentication = (
  req: Request | any,
  _: Response,
  next: NextFunction
) => {
  let token: string | null = null;
  if (req.headers) {
    token = req.headers["authorization"]?.split(" ")[1];
  }

  let decodedUser: any = null;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err: Error, decoded: any) => {
      if (!err) {
        // @ts-ignore
        decodedUser = decoded;
      }
    });
  }
  req.user = decodedUser;
  next();
};

export default optionalAuthentication;
