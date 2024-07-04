const mongoose = require('mongoose');
require('dotenv').config();
const {
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_DATABASE
}=process.env

const MONGODB_URI = `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.b5mbtwk.mongodb.net/${MONGO_INITDB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`

const connectMongoDB = async() => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Atlas connected");
    } catch (error) {
        console.log("MongoDB Atlas connection error:", error);
        process.exit(1);
    }
};

module.exports = connectMongoDB;