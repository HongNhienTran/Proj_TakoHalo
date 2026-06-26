import express from "express";

import { sendFriendRequest, acceptFriendRequest, getAllFriends, getFriendRequests, declineFriendRequest } from "../controllers/friendController.js";

const router = express.Router();

router.post('/requests', sendFriendRequest);
router.post('/requests/:requestId/accept', acceptFriendRequest);
router.post('/requests/:requestId/decline', declineFriendRequest);
router.get('/', getAllFriends);
router.get('/requests', getFriendRequests);

export default router;