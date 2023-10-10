import { productsModel } from "../db/models/Products.model.js";

class ProductManager {
    async getProducts() {
        try {
            return await productsModel.find().lean();
        } catch (err) {
            return err;
        }
    }

    async getProductById(id) {
        try {
            return await productsModel.findById(id);
        } catch (err) {
            return { error: err.message };
        }
    }

    async addProduct(product) {
        try {
            await productsModel.create(product);
            return await productsModel.findOne({ title: product.title });
        } catch (err) {
            return err;
        }
    }

    async updateProduct(id, product) {
        try {
            return await productsModel.findByIdAndUpdate(id, { $set: product });
        } catch (err) {
            return err;
        }
    }

    async deleteProduct(id) {
        try {
            return await productsModel.findByIdAndDelete(id);
        } catch (err) {
            return err;
        }
    }
}

export default ProductManager;