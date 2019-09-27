var DB = require('../../dbConnection');
var Product = DB.getModel();

module.exports = 
    function displayProducts(req, res, next) { 
        Product.find({}, (err, products) => {
            if(err) {
                console.log('Error: %s ', err);
            }

            var results = products.map((product) => {
                return {
                    id: product._id,
                    productNumber: product.productNumber,
                    productName: product.productName,
                    productDescription: product.productDescription,
                    productPrice: product.productPrice,
                    productQuantity: product.productQuantity
                }
            });
            res.render('displayProductsShoppingView', 
            {title:"List of Products", data: results, shopper: req.ip });
        });
    };
