import express from "express"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import "../src/db/db.config.js"

// import ViewRouter from "./routes/view.routes.js"
import ProductRouter from "../src/routes/product.router.js"
import CartRouter from "../src/routes/cart.router.js"
import ProductManager from "./Dao/ProductManagerDB.js"

const app =express()
const PORT=8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
//handlebars
app.engine("handlebars",handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine","handlebars")

//rutas
app.use("/api",ProductRouter)
app.use("/api",CartRouter)
//app.use("/",ViewRouter)


const httpServer=app.listen(PORT,()=>{
    console.log("server up ")
})

 const socketServer = new  Server(httpServer)
 const pmanager=new ProductManager()


import MessagesManager from "./Dao/MessagesManager.js";
const messagesManager = new MessagesManager();

socketServer.on("connection",async (socket)=>{
    console.log("cliente conectado con id:" ,socket.id)
    const products = await pmanager.getProducts({});
    socket.emit('productos', products);

    socket.on('addProduct', async data => {
        await pmanager.addProduct(data);
        const updatedProducts = await pmanager.getProducts({}); // Obtener la lista actualizada de productos
    socket.emit('productosupdated', updatedProducts);
      });

      socket.on("deleteProduct", async (id) => {
        console.log("ID del producto a eliminar:", id);
        const deletedProduct = await pmanager.deleteProduct(id);
        const updatedProducts = await pmanager.getProducts({});
        socketServer.emit("productosupdated", updatedProducts);
      });

      socket.on("nuevousuario",(usuario)=>{
        console.log("usuario" ,usuario)
        socket.broadcast.emit("broadcast",usuario)
       })
       socket.on("disconnect",()=>{
           console.log(`Usuario con ID : ${socket.id} esta desconectado `)
       })
   
       socket.on("mensaje", async (info) => {
        // Guardar el mensaje utilizando el MessagesManager
        console.log(info)
        await messagesManager.createMessage(info);
        // Emitir el mensaje a todos los clientes conectados
        socketServer.emit("chat", await messagesManager.getMessages());
      });

})