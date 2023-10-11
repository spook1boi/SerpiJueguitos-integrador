import { cartModel } from "../db/models/Carts.model.js";
import ProductManager from "../Dao/ProductManagerDB.js";

class CartManager {
    constructor() {
        this.productManager = new ProductManager();
    }

    async getCarts() {
        try {
            return await cartModel.find();
        } catch (err) {
            console.error('Error al obtener los carritos:', err.message);
            return [];
        }
    }

    async getCartById(cartId) {
        try {
            return await cartModel.findById(cartId);
        } catch (err) {
            console.error('Error al obtener el carrito por ID:', err.message);
            return err;
        }
    }

    async createCart() {
        try {
            const newCart = await cartModel.create({ products: [] });
            return newCart;
        } catch (err) {
            console.error('Error al crear un nuevo carrito:', err.message);
            return err;
        }
    }

    async addCart(products) {
        try {
            const cartData = { products: products || [] };
            return await cartModel.create(cartData);
        } catch (err) {
            console.error('Error al crear el carrito:', err.message);
            return err;
        }
    }

    async addProductInCart(cartId, product) {
        try {
            const cart = await cartModel.findById(cartId);
            const findProduct = cart.products.some((p) => p._id.toString() === product._id);

            if (findProduct) {
                await cartModel.updateOne({ _id: cartId, "products._id": product._id }, { $inc: { "products.$.quantity": product.quantity } });
            } else {
                await cartModel.updateOne({ _id: cartId }, { $push: { products: product } });
            }

            return await cartModel.findById(cartId);
        } catch (err) {
            console.error('Error al agregar el producto al carrito:', err.message);
            return err;
        }
    }

    async updateCart(cartId, updatedData) {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(cartId, updatedData, { new: true });
            return updatedCart;
        } catch (err) {
            console.error('Error al actualizar el carrito:', err.message);
            return err;
        }
    }

    async deleteCart(cartId) {
        try {
            const deletedCart = await cartModel.findByIdAndRemove(cartId);
            return deletedCart;
        } catch (err) {
            console.error('Error al eliminar el carrito:', err.message);
            return err;
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const result = await cartModel.updateOne(
                { _id: cartId },
                { $pull: { products: { _id: productId } } }
            );

            return result;
        } catch (err) {
            console.error('Error al eliminar el producto del carrito:', err.message);
            return err;
        }
    }
}

export default CartManager;