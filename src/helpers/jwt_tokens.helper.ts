import jwt from "jsonwebtoken";
import { UserDTO } from "../DTOs/user.dto";

export const generateToken = (user: UserDTO): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user?.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
  );
};
