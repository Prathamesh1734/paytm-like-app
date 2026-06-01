import express from "express";
import mongoose from "mongoose";
import { Account } from "../db.js";
import authMiddleWare from "../middleware.js";

const router = express.Router();

router.get("/balance", authMiddleWare, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleWare, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session,
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res
      .status(400)
      .json({ message: "insufficient balance/invalid account" });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "invalid account" });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } },
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } },
  ).session(session);

  await session.commitTransaction();
  res.status(200).json({ message: "transaction complete" });
});

export default router;
