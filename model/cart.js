const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId },
    // placedDate: { type: Date },
    // deliveredDate: { type: Date },
    // address: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);