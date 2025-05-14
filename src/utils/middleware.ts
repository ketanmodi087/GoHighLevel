import express from "express";
import { getValidToken } from "../services/ghlService";
import { IToken } from "../models/Token";

// Extend Express Request with token property
declare global {
  namespace Express {
    interface Request {
      token?: IToken;
    }
  }
}

// Middleware to check userId and attach token
export const validateUserId = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const token = await getValidToken(userId);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.token = token; // Attach token for later use
    next(); // Continue processing
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
