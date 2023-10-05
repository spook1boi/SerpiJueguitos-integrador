import { Router } from 'express';
import ProductManagerDB from '../../src/Dao/ProductsManagerDB';
import { ProductsModel } from '../db/models/Products.model';

const productManager = new ProductManagerDB();

export const router = Router();

router.post("/", async (req, res) => {
    const productData = req.body;
    
    try {
        let product = await productManager.addProduct(productData);
        
        res.status(201).json({ result: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        let products = await productManager.getAllProducts();
        res.status(200).json({ result: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/:productId", async (req, res) => {
    const { productId } = req.params;
    
    if (productId) {
        try {
            let product = await productManager.getProductById(productId);
            res.status(200).json({ result: product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Product ID is empty" });
    }
});

router.put("/:productId", async (req, res) => {
    const { productId } = req.params;
    const updatedData = req.body;
    
    if (productId) {
        try {
            let product = await productManager.updateProduct(productId, updatedData);
            res.status(200).json({ result: product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Product ID is empty" });
    }
});

router.delete("/:productId", async (req, res) => {
    const { productId } = req.params;
    
    if (productId) {
        try {
            await productManager.deleteProduct(productId);
            res.status(200).json({ result: "Product deleted" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Product ID is empty" });
    }
});