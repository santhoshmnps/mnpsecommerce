const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Set up listeners for MongoDB connection events
mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established.");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB connection lost.");
});

mongoose.connection.on("reconnected", () => {
    console.log("MongoDB connection reestablished.");
});

// If the Node process ends, close the MongoDB connection
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to application termination.");
    process.exit(0);
});

module.exports = connectDB;
