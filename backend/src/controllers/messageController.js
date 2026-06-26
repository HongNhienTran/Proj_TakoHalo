import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import { updateConversationAfterCreateMessage } from "../utils/messageHelper.js";

export const sendDirectMesssage = async (req, res) => {
    try {
        const { recipientId, content, conversationId } = req.body;
        const senderId = req.user._id;

        let conversation;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        if (conversationId) {
            conversation = await Conversation.findById(conversationId);
        }

        if (!conversation) {
            conversation = await Conversation.create({
                type: 'direct',
                participants: [
                    { userId: senderId, joinedAt: new Date() },
                    { userId: recipientId, joinedAt: new Date()}
                ],
                lastMessageAt: new Date(),
                unreadCounts: new Map()
            });
        }

        const message = await Message.create({
            conversationId: conversation._id,
            senderId,
            content
        });

        updateConversationAfterCreateMessage(conversation, message, senderId);

        await conversation.save();

        return res.status(201).json({ message: "Message sent", data: message });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const sendGroupMesssage = async (req, res) => {
    try {
        const { conversationId, content } = req.body;
        const senderId = req.user._id;

        const conversation = await Conversation.findById(conversationId);
        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const message = await Message.create({
            conversationId,
            senderId,
            content
        });

        updateConversationAfterCreateMessage(conversation, message, senderId);

        await conversation.save();

        return res.status(201).json({ message: "Message sent", data: message });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}