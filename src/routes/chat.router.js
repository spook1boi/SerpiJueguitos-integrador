import { Router } from 'express';
import { messagesModel } from '../db/models/Messages.model.js';

const router = Router();

router.get('/chat', (req, res) => {
    res.render('chat', { title: 'Chat' });
  });
  
  router.post('/chat', async (req, res) => {
    const { user, message } = req.body;
  
    if (!user || !message) {
      return res.status(400).send('Missing user or message in the request');
    }
  
    try {
      const newMessage = await messagesModel.create({ user, message });
      return res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  });
  
  router.get('/chat/messages', async (req, res) => {
    try {
      const allMessages = await messagesModel.find();
      return res.status(200).json(allMessages);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  });

router.get('/chat/:id', async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await messagesModel.findById(messageId);

    if (!message) {
      return res.status(404).send('Message not found');
    }

    return res.status(200).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.put('/chat/:id', async (req, res) => {
  const messageId = req.params.id;
  const { user, message } = req.body;

  if (!user || !message) {
    return res.status(400).send('Missing user or message in the request');
  }

  try {
    const updatedMessage = await messagesModel.findByIdAndUpdate(messageId, { user, message }, { new: true });

    if (!updatedMessage) {
      return res.status(404).send('Message not found');
    }

    return res.status(200).json(updatedMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.delete('/chat/:id', async (req, res) => {
  const messageId = req.params.id;

  try {
    const deletedMessage = await messagesModel.findByIdAndRemove(messageId);

    if (!deletedMessage) {
      return res.status(404).send('Message not found');
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

export default router;