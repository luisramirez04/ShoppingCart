const mongoose = require('mongoose');

const dbUrl = 'mongodb://127.0.0.1:27017/customers';

let connection = null;
let model = null;

let Schema = mongoose.Schema;

let customerSchema = new Schema({
    customerNumber: String,
    customerOrders: [Object]
}); 

module.exports = {
    getModel: function getModel() {
        if (connection == null) {
            console.log("Creating connection and model...");
            connection = mongoose.createConnection(dbUrl);
            model = connection.model("CustomerModel", customerSchema);
        };
        return model;
    }
};
