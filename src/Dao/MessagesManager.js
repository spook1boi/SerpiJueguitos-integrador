import { MessagesModel as MessageModel } from "../db/models/Messages.model.js";

export default class MessageManager {

    addNewMessage = async ({ sender, text }) => {
        try {
            let message = await MessageModel.create({ sender, text });
            return message;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    getAllMessages = async () => {
        try {
            const messages = await MessageModel.find();
            return messages;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}