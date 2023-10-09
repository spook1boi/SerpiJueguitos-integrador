import { Router } from 'express';
import { Server } from 'socket.io';
import { Message } from '../db/models/Messages.model.js';

const router = Router();
const server = new Server(); 

server.on('connection', (socket) => {
  console.log('Logged in user');

  socket.on('chatMessage', async (message) => {
    try {
      const newMessage = new Message(message); 
      await newMessage.save();
      console.log('Message saved in the database:', newMessage);
    } catch (error) {
      console.error('Error saving message to database:', error);
    }

    server.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected user');
  });
});

export { router, server };