import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

export const CartModel = mongoose.model("gCart", CartSchema);