import jwt from "jsonwebtoken";

interface PayloadParams {
  id: string;
  role: "SUPER_ADMIN" | "ADMIN" | "STAFF";
}

export const generateToken = (payload: PayloadParams): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
