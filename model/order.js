const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId: { type: Array },
    userId: { type: mongoose.Schema.Types.ObjectId },
    placedDate: { type: Date },
    deliveredDate: { type: Date },
    address: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true });

module.exports = mongoose.model("Order", cartSchema);