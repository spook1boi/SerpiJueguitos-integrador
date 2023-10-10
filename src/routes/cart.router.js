import { Router } from "express";
import CartManager from "../Dao/CartManagerDB.js";
import ProductManager from "../Dao/ProductManagerDB.js";

const CartRouter = Router();
const cm = new CartManager();
const pm = new ProductManager();

CartRouter.post("/carts", async (req, res) => {
    try {
        const { products } = req.body;

        if (!Array.isArray(products)) {
            return res.status(400).send('Invalid request: products must be an array');
        }

        const validProducts = [];

        for (const product of products) {
            const checkId = await pm.getProductById(product._id);
            if (!checkId) {
                return res.status(404).send(`Product with id ${product._id} not found`);
            }
            validProducts.push(checkId);
        }

        const cart = await cm.addCart(validProducts);
        res.status(200).json(cart);

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

CartRouter.post("/carts", async (req, res) => {
  try {
      const { products } = req.body;

      if (!Array.isArray(products)) {
          return res.status(400).send('Invalid request: products must be an array');
      }

      const validProducts = [];

      for (const product of products) {
          const checkId = await pm.getProductById(product._id);
          if (!checkId) {
              return res.status(404).send(`Product with id ${product._id} not found`);
          }
          validProducts.push(checkId);
      }

      const newCart = await cm.createCart();

      for (const product of validProducts) {
          await cm.addProductInCart(newCart._id, product);
      }

      res.status(200).json(newCart);

  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

CartRouter.get("/carts", async (req, res) => {
    try {
        const carts = await cm.getCarts();
        res.json({ carts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

CartRouter.get("/carts/:cid", async (req, res) => {
    try {
        const carritoFound = await cm.getCartById(req.params.cid);
        if (!carritoFound) {
            return res.status(404).json({ status: "error", message: `Cart with id ${req.params.cid} not found` });
        }
        res.json({ status: "success", carritoFound });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

CartRouter.post("/carts/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const checkIdProduct = await pm.getProductById(pid);
        if (!checkIdProduct) {
            return res.status(404).json({ message: `Product with id ${pid} not found` });
        }

        const checkIdCart = await cm.getCartById(cid);
        if (!checkIdCart) {
            return res.status(404).json({ message: `Cart with id ${cid} not found` });
        }

        const result = await cm.addProductInCart(cid, { _id: pid, quantity });
        console.log(result);
        res.status(200).json({
            message: `Product with id ${pid} added to Cart with id ${cid}`,
            cart: result,
        });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ message: "An error occurred" });
    }
});

export default CartRouter;