import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
  },
  quantity: {
    type: Number,
    required: true,
  },
});


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  items: [cartItemSchema], 

});

export const Cart = mongoose.model('Cart', cartSchema);

