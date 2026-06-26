import express from "express";
import { checkFriendship } from "../middlewares/friendMiddleware.js";

import {
    sendDirectMesssage, sendGroupMesssage
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/direct", checkFriendship, sendDirectMesssage);
router.post("/group", sendGroupMesssage);

export default router;