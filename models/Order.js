// models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cart: [
    {
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  address: { type: String, required: true },
  country: String,
  state: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);