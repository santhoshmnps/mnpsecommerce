const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    categories: { type: String, enum: ["Electronics", "Home Appliances", "Smart Gadgets", "Toys", "Books", "Furnitures", "Beauty & Personal", "Care", "Fashsion", "Groceries", "Health Care", "Auto Accessories", "Services"], require: "Categories is required" },
    images: { type: String },
    text: { type: String },
    mrpPrice: { type: String },
    scalePrice: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);