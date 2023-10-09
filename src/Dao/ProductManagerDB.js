import Product from '../db/models/Products.model.js';

class ProductManagerDB {
  async createProduct(title, description, price, stock, thumbnails) {
    try {
      const newProduct = await Product.create({ title, description, price, stock, thumbnails });
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productId, updatedData) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      await Product.findByIdAndDelete(productId);
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductManagerDB();