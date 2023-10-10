import { Router } from 'express';
import { messagesModel } from '../db/models/Messages.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        let messages = await messagesModel.find();
        res.json({ result: "success", payload: messages });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const { user, message } = req.body;
    if (!user || !message) {
        res.status(400).json({ status: "error", error: "Missing body params" });
        return;
    }
    try {
        const result = await messagesModel.create({ user, message });
        res.json({ result: "success", payload: result });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id_msg', async (req, res) => {
    const { id_msg } = req.params;
    const messagesToReplace = req.body;
    if (!messagesToReplace.user || !messagesToReplace.message) {
        res.status(400).json({ status: "error", error: "Missing body params" });
        return;
    }
    try {
        const result = await messagesModel.updateOne({ _id: id_msg }, messagesToReplace);
        res.json({ result: "success", payload: result });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id_msg', async (req, res) => {
    const { id_msg } = req.params;
    try {
        const result = await messagesModel.deleteOne({ _id: id_msg });
        res.json({ result: "success", payload: result });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;