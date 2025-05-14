import express from "express";
import {
  fetchAssociations,
  fetchCalendars,
  fetchContacts,
  fetchOpportunities,
  fetchUsers,
  refreshAccessToken,
} from "../services/ghlService";
import { validateUserId } from "../utils/middleware";
import { IToken } from "../models/Token";

const router = express.Router();

// Refresh token endpoint for a user
router.post("/tokens/:userId/refresh", validateUserId, async (req, res) => {
  try {
    // Use the token from the request to refresh and return a new access token
    const token = await refreshAccessToken(req?.token as IToken);

    res.json({
      message: "Token refreshed successfully",
      userId: token._id,
      expiresAt: token.expiresAt,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

// Get contacts endpoint (with optional pagination)
router.get("/contacts/:userId", validateUserId, async (req, res) => {
  try {
    const { page, limit } = req.query;
    // Retrieve contacts using the user token and pagination params if provided
    const contacts = await fetchContacts(req?.token as IToken, {
      page: page ? page.toString() : undefined,
      limit: limit ? limit.toString() : undefined,
    });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// Get opportunities endpoint
router.get("/opportunities/:userId", validateUserId, async (req, res) => {
  try {
    // Fetch opportunities using the validated token
    const opportunities = await fetchOpportunities(req?.token as IToken);
    res.json(opportunities);
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    res.status(500).json({ error: "Failed to fetch opportunities" });
  }
});

// Get users endpoint
router.get("/users/:userId", validateUserId, async (req, res) => {
  try {
    // Retrieve users data with the provided token
    const users = await fetchUsers(req?.token as IToken);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get calendars endpoint
router.get("/calendars/:userId", validateUserId, async (req, res) => {
  try {
    // Fetch calendars using the authenticated user's token
    const calendars = await fetchCalendars(req?.token as IToken);
    res.json(calendars);
  } catch (error) {
    console.error("Error fetching calendars:", error);
    res.status(500).json({ error: "Failed to fetch calendars" });
  }
});

// Get associations endpoint
router.get("/associations/:userId", validateUserId, async (req, res) => {
  try {
    // Retrieve associations using the current user token
    const associations = await fetchAssociations(req?.token as IToken);
    res.json(associations);
  } catch (error) {
    console.error("Error fetching associations:", error);
    res.status(500).json({ error: "Failed to fetch associations" });
  }
});

export default router;
