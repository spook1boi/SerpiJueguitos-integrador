import express from 'express';
import CartManagerDB from '../dao/CartManagerDB.js'; 

const router = express.Router();
const cartManager = new CartManagerDB();

router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:cartId', async (req, res) => {
  const { cartId } = req.params;

  try {
    const cart = await cartManager.getCartById(cartId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:cartId/product/:productId', async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartManager.addProductToCart(cartId, productId, quantity);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart or product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:cartId/product/:productId/quantity', async (req, res) => {
  const { cartId, productId } = req.params;
  const { newQuantity } = req.body;

  try {
    const cart = await cartManager.updateProductQuantity(cartId, productId, newQuantity);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart or product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:cartId/product/:productId', async (req, res) => {
  const { cartId, productId } = req.params;

  try {
    const removed = await cartManager.removeProductFromCart(cartId, productId);
    if (removed) {
      res.json({ message: 'Product removed from cart' });
    } else {
      res.status(404).json({ error: 'Cart or product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;