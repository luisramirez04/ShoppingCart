var Db = require('../../dbConnection');
var Product = Db.getModel();

module.exports = 
    function saveProduct(req, res, next) {
        var product = new Product({
            productNumber: req.body.pnumber,
            productName: req.body.pname,
            productDescription: req.body.pdescription,
            productPrice: req.body.pprice,
            productQuantity: req.body.pquantity
        });

        product.save(function(err) {
            if (err) {
                console.log("Error: %s", err);
            }
            res.redirect('/products');
        });
    };