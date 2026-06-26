export const updateConversationAfterCreateMessage = async (conversation, message, senderId) => {
    conversation.set({
        seenBy: [],
        lastMessageAt: message.createdAt,
        lastMessage: {
            _id: message._id,
            content: message.content,
            senderId,
            createdAt: message.createdAt
        }
    });

    // BẢO VỆ: Nếu unreadCounts chưa tồn tại (undefined), khởi tạo nó thành một Map mới
    if (!conversation.unreadCount) {
        conversation.unreadCount = new Map();
    }

    conversation.participants.forEach((p) => {
        // Đảm bảo p.userId tồn tại trước khi toString() để tránh lỗi crash khác
        if (!p.userId) return; 

        const memberId = p.userId.toString();
        const isSender = memberId === senderId.toString();
        
        // Bây giờ chắc chắn unreadCounts đã là một Map, có thể an toàn .get() và .set()
        const prevCount = conversation.unreadCount.get(memberId) || 0;
        conversation.unreadCount.set(memberId, isSender ? 0 : prevCount + 1);
    });
};