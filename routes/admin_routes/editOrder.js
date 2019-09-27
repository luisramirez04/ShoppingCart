var orderDb = require('../../orderDbConnection');
var Order = orderDb.getModel();

module.exports = 
    function editOrder(req, res, next) {
        var id = req.params.id; 

        Order.findById(id, function (err, order) {
            if (err) console.log("Error Selecting : %s", err);
            if (!order) {
                return res.render("404");
            }
            res.render("editOrderView", 
                {title: "Edit Order", 
            data: {id: order._id, 
                    orderDate: order.orderDate, 
                    orderQuantity: order.orderQuantity,
                    orderProduct: order.orderProduct,
                    orderCustomer: order.orderCustomer,
                    
            }})
        })
    };