var orderDb = require('../../orderDbConnection');
var Order = orderDb.getModel();

module.exports = 
    function saveOrder(req, res, next) {
       var id = req.params.id;

       Order.findById(id, function(err, order) {
           if (err) console.log("Error Selecting: %s", error);
           if (!order) {
               return res.render("404");
           }

           order.orderQuantity = req.body.oquant;

            order.save(function(err) {
                if (err) {
                    console.log("Error: %s", err);
                }
                res.redirect(`/customers/${order.orderCustomer}`);
            });
        });
    };