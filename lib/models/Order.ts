import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,

    items: [
      {
        productId: Number,
        name: String,
        quantity: Number,
        size: String,
        price: Number,
      },
    ],

    subtotal: Number,
    deliveryFee: Number,
    discount: Number,
    total: Number,

    stripeSessionId: String,

    paymentStatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);