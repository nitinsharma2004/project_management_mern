import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();
router.post("/send/:id", verifyToken, sendMessage);
router.get("/get/:id",verifyToken, getMessage);

export default router;
