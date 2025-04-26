import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


// Generate Access Token (Short-lived)
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.ACCESS_TOKEN_SECRET, // Separate secret for access token
    { expiresIn: "15m" } // Short-lived token
  );
};

// Generate Refresh Token (Long-lived)
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET, // Separate secret for refresh token
    { expiresIn: "7d" } // Long-lived token
  );
};

// Verify Access Token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};
