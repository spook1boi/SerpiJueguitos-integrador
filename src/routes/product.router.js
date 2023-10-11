import { Router } from "express";
import ProductManager from "../Dao/ProductManagerDB.js";

const ProductRouter = Router();
const pm = new ProductManager();

ProductRouter.get("/products", async (req, res) => {
    try {
        const products = await pm.getProducts();
        if (products.length === 0) {
            res.json({ message: "No hay productos en la tienda" });
        } else {
            res.json({ message: "success", products });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

ProductRouter.get("/products/:pid", async (req, res) => {
    const productId = req.params.pid;
    try {
        const productfind = await pm.getProductById(productId);
        res.json({ status: "success", productfind });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

ProductRouter.post("/products", async (req, res) => {
    const newProduct = req.body;
    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.stock || !newProduct.thumbnails) {
        res.status(400).json({ error: 'Debe proporcionar todos los campos: title, description, price, stock, thumbnails' });
        return;
    }
    try {
        const newproduct = await pm.addProduct(newProduct);
        res.json({ status: "success", newproduct });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

ProductRouter.put("/products/:pid", async (req, res) => {
    const productId = req.params.pid;
    const updateProducts = req.body;
    try {
        const updatedproduct = await pm.updateProduct(productId, updateProducts);
        res.json({ status: "success", updatedproduct });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

ProductRouter.delete("/products/:pid", async (req, res) => {
    const productId = req.params.pid;
    try {
        const deleteproduct = await pm.deleteProduct(productId);
        res.json({ status: "success", deleteproduct });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

export default ProductRouter;