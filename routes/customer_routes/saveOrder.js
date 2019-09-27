var Db = require('../../dbConnection');
var orderDb = require('../../orderDbConnection');
var customerDb = require("../../customerDbConnection");
var Product = Db.getModel();
var Order = orderDb.getModel();
var Customer = customerDb.getModel();

module.exports = 
    function saveOrder(req, res, next) {
       var id = req.params.id;

       Product.findById(id, function(err, product) {
           if (err) console.log("Error Selecting: %s", error);
           
           if (!product) {
               return res.render("404");
           }

           if (product.productQuantity < req.body.oquantity) {

            res.redirect(303,`/shopping/products/${product.id}`);
           }
            product.productQuantity -= req.body.oquantity;
  
            product.save(function(err) {
                if (err) console.log("Error: %s", err);
            });

            var order = new Order({
                orderDate: new Date(),
                orderQuantity: req.body.oquantity,
                orderProduct: product,
                orderCustomer: req.ip
            });

            Customer.findOne({customerNumber: req.ip}, function(err, customer) {
                if (err) console.log("Error checking if existing customer");

                if (!customer) {
                    var newCustomer = new Customer({
                        customerNumber: req.ip,
                        customerOrders: new Array(order)
                    })

                    newCustomer.save(function(err) {
                        if (err) console.log("Error: %s", err);
                    });
                    
                } else {
                    customer.customerOrders.push(order);
                    customer.save(function(err) {
                        if (err) console.log("Error: %s", err);
                    });
                }

            });
    
            order.save(function(err) {
                if (err) {
                    console.log("Error: %s", err);
                }
    
                res.redirect(`/shopping/orders/customers/${req.ip}`);
            });
        }); 
    };