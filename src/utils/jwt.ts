import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

/* 
Generate a JWT token with a default 1 hour expiry
*/
export const generateToken = (
  payload: object,
  options?: SignOptions,
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h", ...options });
};

/* 
Verify a JWT token and return the decoded payload or null if invalid
*/
export const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

/* 
Decode a JWT token without verifying signature
*/
export const decodeToken = (token: string): JwtPayload | string | null => {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
};

/* 
Check if a JWT token is expired or invalid
*/
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || typeof decoded === "string" || !("exp" in decoded))
    return true;
  const exp = (decoded as JwtPayload).exp;
  if (!exp) return true;
  return Date.now() >= exp * 1000;
};
