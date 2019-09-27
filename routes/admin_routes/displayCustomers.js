var customersDB = require('../../customerDbConnection');
var Customer = customersDB.getModel();

module.exports = 
    function displayCustomers(req, res, next) { 
        Customer.find({}, (err, customers) => {
            if(err) {
                console.log('Error: %s ', err);
            }

            var results = customers.map((customer) => {
                return {
                    id: customer._id,
                    customerNumber: customer.customerNumber,
                    customerOrders: customer.customerOrders
                }
            });
            res.render('displayCustomersView', 
            {title:"List of Customers", data: results});
        });
    };
