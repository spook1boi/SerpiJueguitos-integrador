import { Router } from 'express';
import CartManagerDB from '../Dao/CartManagerDB';
import CartManagerFS from '../Dao/CartManagerFS.js';
import { findProductIdInDatabase } from './product.router.js';

const dbManager = new CartManagerDB();
const fsManager = new CartManagerFS("carts.json");

export const router = Router();

router.post("/", async (req, res) => {
    const { products } = req.body;
    
    try {
        let cart = await dbManager.createShoppingCart(products);
        
        res.status(200).json({ result: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/:cartId", async (req, res) => {
    const { cartId } = req.params;
    
    if (cartId) {
        try {
            let cart = await dbManager.getShoppingCartById(cartId);
            res.status(200).json({ result: cart });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Cart ID is empty" });
    }
});

router.put("/:cartId/product/:productId", async (req, res) => {
    const { cartId, productId } = req.params;
    
    if (cartId && productId) {
        try {
            let result = await dbManager.updateShoppingCart(cartId, productId);
            res.status(200).json({ result: result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Cart ID and Product ID must be provided" });
    }
});

router.delete("/:cartId", async (req, res) => {
    const { cartId } = req.params;
    
    if (cartId) {
        try {
            await dbManager.deleteShoppingCart(cartId);
            res.status(200).json({ result: "Cart deleted" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Cart ID is empty" });
    }
});