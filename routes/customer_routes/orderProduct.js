var Db = require('../../dbConnection');
var Product = Db.getModel();

module.exports = 
    function orderProduct(req, res, next) {
        var id = req.params.id; 

        Product.findById(id, function (err, product) {
            if (err) console.log("Error Selecting : %s", err);
            if (!product) {
                return res.render("404");
            }
            res.render("orderProductView", 
                {title: "Order Product", 
            data: {id: product._id, 
                    productNumber: product.productNumber, 
                    productName: product.productName,
                    productDescription: product.productDescription,
                    productPrice: product.productPrice,
                    productQuantity: product.productQuantity}})
        })
    };