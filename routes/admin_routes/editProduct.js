var Db = require('../../dbConnection');
var Product = Db.getModel();

module.exports = 
    function editProduct(req, res, next) {
        var id = req.params.id; 

        Product.findById(id, function (err, product) {
            if (err) console.log("Error Selecting : %s", err);
            if (!product) {
                return res.render("404");
            }
            res.render("editProductView", 
                {title: "Edit Product", 
            data: {id: product._id, 
                    productNumber: product.productNumber, 
                    productName: product.productName,
                    productDescription: product.productDescription,
                    productPrice: product.productPrice,
                    productQuantity: product.productQuantity}})
        })
    };