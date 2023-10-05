import { ProductsModel as ProductModel } from "../db/models/Products.model";

export default class ProductManagerDB {

    addNewProduct = async (productData) => {
        const { title, description, code, price, status, stock, category, images } = productData;

        if (title && description && code && price && stock && category) {
            let titleValidated = String(title);
            let descriptionValidated = String(description);
            let codeValidated = String(code);
            let priceValidated = parseFloat(price);
            let statusValidated = status !== undefined ? Boolean(status) : true;
            let stockValidated = parseInt(stock);
            let categoryValidated = String(category);
            let imagesValidated = images;

            if (imagesValidated && Array.isArray(imagesValidated)) {
                imagesValidated = imagesValidated.map(image => String(image));
            }

            let product = {
                title: titleValidated,
                description: descriptionValidated,
                code: codeValidated,
                price: priceValidated,
                stock: stockValidated,
                category: categoryValidated,
                thumbnails: imagesValidated,
                status: statusValidated
            };

            try {
                await ProductModel.create(product);
                return "Product added";
            } catch (error) {
                console.log(error);
                return error;
            }
        } else {
            return "Error: Some fields are empty or invalid";
        }
    }

    getAllProducts = async () => {
        try {
            const products = await ProductModel.find();
            return products;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    getProductById = async (productId) => {
        try {
            let product = await ProductModel.findById(productId);
            if (product) {
                return product;
            } else {
                return { Error: "Product not found" };
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    updateProduct = async (productId, updatedData) => {
        try {
            const updatedProduct = await ProductModel.findOneAndUpdate({ _id: productId }, updatedData);
            return updatedProduct;
        } catch (error) {
            return error;
        }
    }

    deleteProduct = async (productId) => {
        try {
            await ProductModel.findByIdAndDelete(productId);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}