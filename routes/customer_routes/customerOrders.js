var orderDB = require('../../orderDbConnection');
var Order = orderDB.getModel();

module.exports = 
    function displayOrders(req, res, next) { 
        Order.find({ orderCustomer: req.ip }, (err, orders) => {
            if(err) {
                console.log('Error: %s ', err);
            }

            var results = orders.map((order) => {
                return {
                    id: order._id,
                    orderDate: order.orderDate,
                    orderQuantity: order.orderQuantity,
                    orderProduct: order.orderProduct,
                    orderCustomer: order.orderCustomer,
                }
            });
            res.render('displayCustomerOrderView', 
            {title:"List of Orders", data: results});
        });
    };
