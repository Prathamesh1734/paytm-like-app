import jwt from "jsonwebtoken";
import JWT_SECRET from "./config.js";

function authMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "not authenticated/missing token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(411).json({ message: "userid doesnt exist" });
    }
  } catch (err) {
    return res.status(411).json({ err });
  }
}

export default authMiddleWare;
