import { Cart } from '../db/models/Carts.model.js';
import { Product } from '../db/models/Products.model.js'; 

class CartManagerDB {
  async createCart() {
    try {
      const newCart = new Cart();
      return await newCart.save();
    } catch (error) {
      throw new Error('Error creating cart in the database');
    }
  }

  async getCartById(cartId) {
    try {
      return await Cart.findById(cartId);
    } catch (error) {
      throw new Error('Error fetching cart from the database');
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      const product = await Product.findById(productId);

      if (!cart || !product) {
        return null;
      }

      cart.products.push({ product: productId, quantity });
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error adding product to cart in the database');
    }
  }

  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await Cart.findById(cartId);

      if (!cart) {
        return null;
      }

      const productIndex = cart.products.findIndex((item) => item.product == productId);

      if (productIndex === -1) {
        return null;
      }

      cart.products[productIndex].quantity = newQuantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error updating product quantity in the database');
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);

      if (!cart) {
        return false;
      }

      const initialLength = cart.products.length;
      cart.products = cart.products.filter((item) => item.product != productId);

      if (cart.products.length < initialLength) {
        await cart.save();
        return true;
      }

      return false;
    } catch (error) {
      throw new Error('Error removing product from cart in the database');
    }
  }
}

export default CartManagerDB;