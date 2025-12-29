import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models";
import { logger } from "../config/logger";

const router = Router();
const SALT_ROUNDS = 10;

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
  name?: string;
}

interface UpdateProfileRequest {
  userId: string;
  name?: string;
  currency?: "USD" | "INR";
}

router.post(
  "/login",
  async (req: Request<object, object, LoginRequest>, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    try {
      const user = await User.findOne({ username });

      if (!user) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
      }

      res.json({
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        currency: user.currency || "INR",
      });
    } catch (error) {
      logger.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/register",
  async (req: Request<object, object, RegisterRequest>, res: Response) => {
    const { username, password, name } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    if (username.length < 3) {
      res.status(400).json({ error: "Username must be at least 3 characters" });
      return;
    }

    if (password.length < 4) {
      res.status(400).json({ error: "Password must be at least 4 characters" });
      return;
    }

    try {
      // Check if username already exists
      const existingUser = await User.countDocuments({ username });
      if (existingUser > 0) {
        res.status(400).json({ error: "Username already exists" });
        return;
      }

      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Create new user
      const newUser = await User.create({
        username,
        password: hashedPassword,
        name: name || username,
        currency: "INR",
      });

      res.status(201).json({
        id: newUser._id.toString(),
        username: newUser.username,
        name: newUser.name,
        currency: newUser.currency,
      });
    } catch (error) {
      logger.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/profile",
  async (req: Request<object, object, UpdateProfileRequest>, res: Response) => {
    const { userId, name, currency } = req.body;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, currency },
        { new: true }
      );

      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json({
        id: updatedUser._id.toString(),
        username: updatedUser.username,
        name: updatedUser.name,
        currency: updatedUser.currency || "INR",
      });
    } catch (error) {
      logger.error("Profile update error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
