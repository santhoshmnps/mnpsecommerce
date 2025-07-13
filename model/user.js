const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER", require: "Provide Role" },
    lastLoggedIn: { type: Date },
    profile: { type: String },
    address: [{
        doorNo: { type: String },
        building: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);