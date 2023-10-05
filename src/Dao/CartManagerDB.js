import { ProductsModel as ProductModel } from "../db/models/Products.model.js";
import { CartModel as ShoppingCartModel } from "../db/models/Carts.model.js";

export default class ShoppingCartManagerDB {

    createShoppingCart = async (productIds) => {
        let cart;
        let product;

        if (productIds?.length > 0) {
            cart = await ShoppingCartModel.create({ products: [] });

            for (const productId of productIds) {
                product = await ProductModel.findById(productId);

                if (product) {
                    cart.products.push({ item: product._id, qty: product.qty });
                }
            }
            await cart.save();
        } else {
            cart = await ShoppingCartModel.create({ products: [] });
        }
        return cart;
    }

    getShoppingCarts = async () => {
        const shoppingCarts = await ShoppingCartModel.find().populate("products.item");
        return shoppingCarts;
    }

    getShoppingCartById = async (cartId) => {
        let cart = await ShoppingCartModel.findById(cartId).populate("products.item");
        return cart;
    }

    updateShoppingCart = async (cartId, productId) => {
        let cart = await this.getShoppingCartById(cartId);
        let product = await ProductModel.findById(productId);

        if (!product || !cart) {
            throw Error("Cannot find cart ID");
        }

        cart.products.push({
            item: product._id
        });

        await cart.save();
        return cart;
    }
}