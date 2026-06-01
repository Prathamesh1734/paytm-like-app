import express from "express";
import zod from "zod";
import { User, Account } from "../db.js";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js";
import authMiddleWare from "../middleware.js";

const router = express.Router();

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6, "at least 6 characters"),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateUserSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({ message: "invalid creds" });
  }

  const existingUser = await User.findOne({ username: body.username });

  if (existingUser) {
    return res.status(411).json({ message: "user already exists" });
  }

  const user = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  });

  const userId = user._id;

  await Account.create({ userId, balance: 1 + Math.random() * 10000 });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({ message: "user created", token });
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);

  if (!success) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return res.status(200).json({ message: "signed in success", token: token });
  } else {
    return res.status(411).json({ message: "error while logging in" });
  }
});

router.put("/", authMiddleWare, async (req, res) => {
  const { success } = updateUserSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({ message: "error while updating info" });
  }

  await User.updateOne(req.body, { id: req.userId });

  res.status(200).json({ message: "user updated" });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

export default router;
