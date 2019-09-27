var orderDb = require('../../orderDbConnection');
var Order = orderDb.getModel();

module.exports = 
    function deleteOrder(req, res, next) {
        var id = req.params.id; 

        Order.findById(id, function (err, order) {
            if (err) console.log("Error Selecting : %s", err);
            if (!order) {
                return res.render("404");
            }
            
            order.remove(function(err) {
                if (err) console.log("Error Deleting: %s", err);
                res.redirect(`/customers/${order.orderCustomer}`);
            });
        });
    };