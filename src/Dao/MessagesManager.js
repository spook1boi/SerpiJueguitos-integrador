import mongoose from 'mongoose';
import Message from '../db/models/Messages.model.js';

export async function createMessage(user, message) {
  try {
    const newMessage = new Message({ user, message });
    const savedMessage = await newMessage.save();
    return savedMessage;
  } catch (error) {
    throw error;
  }
}

export async function getAllMessages() {
  try {
    const messages = await Message.find();
    return messages;
  } catch (error) {
    throw error;
  }
}