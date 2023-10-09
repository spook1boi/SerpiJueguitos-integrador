import express from 'express';
import { createServer } from 'http';
import { Server as SocketIo } from 'socket.io';
import mongoose from 'mongoose';
import path from 'path';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import { router as chatRouter, server as chatServer } from './routes/chat.router.js';
import { getPublicDirname } from './utils.js';

const app = express();
const server = createServer(app);
const io = new SocketIo(server);

mongoose.connect('mongodb+srv://SpookyBoi:Aqr6Tt0QgOgQ0qTl@cluster0.lozpuyb.mongodb.net/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Successful connection to MongoDB.');
});

app.set('view engine', 'handlebars');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(getPublicDirname(import.meta.url)));

app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/chat', chatRouter);

app.use((req, res, next) => {
  res.status(404).send('Page not found');
});


io.on('connection', (socket) => {
  console.log('A customer has connected to the chat.');
  require('./public/js/chat')(socket, io);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});