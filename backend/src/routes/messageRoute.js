import express from "express";
import { checkFriendship, checkGroupMembership } from "../middlewares/friendMiddleware.js";

import {
    sendDirectMesssage, sendGroupMesssage
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/direct", checkFriendship, sendDirectMesssage);
router.post("/group", checkGroupMembership, sendGroupMesssage);

export default router;