import { messagesModel } from "../db/models/Messages.model.js";

class MessagesManager {
    async getMessages() {
        try {
            return await messagesModel.find().lean().exec();
        } catch (error) {
            return error;
        }
    }

    async createMessage(message) {
        try {
            return await messagesModel.create(message);
        } catch (error) {
            return error;
        }
    }
}

export default MessagesManager;