import express from 'express';
const router = express.Router();
import ProductManagerDB from '../dao/ProductManagerDB.js';

router.post('/', async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = await ProductManagerDB.addProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await ProductManagerDB.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await ProductManagerDB.getProductById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:productId', async (req, res) => {
  const { productId } = req.params;
  const updatedData = req.body;
  try {
    const updatedProduct = await ProductManagerDB.updateProduct(productId, updatedData);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await ProductManagerDB.deleteProduct(productId);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Product not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;