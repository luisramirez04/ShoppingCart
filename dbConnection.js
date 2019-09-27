const mongoose = require('mongoose');

const dbUrl = 'mongodb://127.0.0.1:27017/products';

let connection = null;
let model = null;

let Schema = mongoose.Schema;

let productSchema = new Schema({
    productNumber: Number,
    productName: String,
    productDescription: String, 
    productPrice: Number,
    productQuantity: Number
});

module.exports = {
    getModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and model...");
            connection = mongoose.createConnection(dbUrl);
            model = connection.model("ProductModel", productSchema);
        };
        return model;
    }
};
