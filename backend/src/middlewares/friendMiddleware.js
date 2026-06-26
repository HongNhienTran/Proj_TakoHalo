import Conversation from "../models/Conversation.js";
import Friend from "../models/Friend.js";

const pair = (a, b) => ( a< b ? [a, b] : [b, a] );

export const checkFriendship = async (req, res, next) => {
    try {
        const me = req.user._id;

        const recipientId = req.body?.recipientId ?? null;

        const memberIds = req.body?.memberIds ?? [];

        if (!recipientId && memberIds.length === 0) {
            return res.status(400).json({ message: "Either recipient ID or member IDs are required" });
        }

                
        if(recipientId) {
            const [userA, userB] = pair(me.toString(), recipientId.toString());
            const isFriend = await Friend.findOne({ userA, userB });
            if (!isFriend) {
                return res.status(403).json({ message: "You are not friends with this user" });
            }
            return next();
        }
        //group chat
        const friendChecks = memberIds.map( async (memberId) => {
            const [userA, userB] = pair(me.toString(), memberId.toString());
            const friend = await Friend.findOne({ userA, userB });
            return friend ? null : memberId;    
        });

        const results = await Promise.all(friendChecks);
        const notFriends = results.filter(Boolean);

        if (notFriends.length > 0) {
            return res.status(403).json({ message: `You are not friends with users: ${notFriends.join(", ")}` });
        }

        return next();
    } catch (error) {
        console.error("Error in checkFriendship:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const checkGroupMembership = async (req, res, next) => {
    try {
        const {conversationId} = req.body;
        const userId = req.user._id;

        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        const isMember = conversation.participants.some(
            p => p.userId.toString() === userId.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this conversation" });
        }
        req.conversation = conversation;
        next();
    } catch (error) {
        console.error("Error in checkGroupMembership:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}