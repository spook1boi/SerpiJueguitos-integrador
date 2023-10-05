import express from "express";
import { __dirname as __dirnaname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { router as ProductRouter, dbInstance as productDB, dbMethods as productDBMethods } from "../src/routes/product.router.js";
import { router as CartRouter } from "../src/routes/cart.router.js";
import MessageManager from "../src/Dao/MessagesManager.js";
import "../src/db/db.config.js";

const msgInstance = new MessageManager();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirnaname + "/public"));
app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);
app.use('/', ViewsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirnaname + "/views");
app.set("view engine", "handlebars");

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log("Servidor en funcionamiento en el puerto " + PORT);
});

const socketServer = new Server(httpServer);
let p = 0;

socketServer.on('connection', async (socket) => {
    p += 1;
    console.log(`${p} usuarios conectados`);

    const products = await productDBMethods.getProducts();
    const msgs = await msgInstance.getMsgs();

    socket.emit('productList', products);
    socket.emit('messages', msgs);

    socket.on('newMsg', async obj => {
        console.log("Nueva mensaje recibido");
        try {
            await msgInstance.newMsg(obj);
            const updateMsg = await msgInstance.getMsgs();
            socketServer.emit('messages', updateMsg);
        } catch (error) {
            return;
        }
    });

    socket.on('addProduct', async product => {
        console.log("Nuevo producto agregado");
        try {
            await productDBMethods.addProduct(product);
            const updatedProducts = await productDBMethods.getProducts();
            console.log(updatedProducts);

            if (Array.isArray(updatedProducts)) socketServer.emit('productList', updatedProducts);
        } catch (error) {
            return;
        }
    });

    socket.on('deleteProduct', async (idProduct) => {
        try {
            console.log("Producto eliminado");
            await productDBMethods.deleteProduct(idProduct);
            const updatedProducts = await productDBMethods.getProducts();
            if (Array.isArray(updatedProducts)) socketServer.emit('productList', updatedProducts);
        } catch (error) {
            return;
        }
    });

    socket.on('disconnect', (msg) => {
        p -= 1;
        console.log(`${p} usuarios conectados`);
        console.log(msg);
    });
});