const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017/LoanOriginationAndManagement';

const connectToMongoose = async () =>{
    try {
        await mongoose.connect(mongooseURI);
        console.log("Connected to Mongo Successfully");
        } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        }
}

module.exports = connectToMongoose;