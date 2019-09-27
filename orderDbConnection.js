const mongoose = require('mongoose');

const dbUrl = 'mongodb://127.0.0.1:27017/orders';

let connection = null;
let model = null;

let Schema = mongoose.Schema;

let orderSchema = new Schema({
    orderDate: Date,
    orderQuantity: Number,
    orderProduct: Object,
    orderCustomer: String
}); 

module.exports = {
    getModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and model...");
            connection = mongoose.createConnection(dbUrl);
            model = connection.model("OrderModel", orderSchema);
        };
        return model;
    }
};
