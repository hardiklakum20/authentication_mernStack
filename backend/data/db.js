const mongoose = require("mongoose");

const Mongo_url = process.env.MONGO_CONN;

const connectDB = async () => {
    try {
        await mongoose.connect(Mongo_url);
        console.log("Connected to DB");
    } catch (err) {
        console.error("DB Connection Failed", err);
        process.exit(1);
    }
};

module.exports = connectDB;
