var Db = require('../../dbConnection');
var Product = Db.getModel();

module.exports = 
    function saveProduct(req, res, next) {
       var id = req.params.id;

       Product.findById(id, function(err, product) {
           if (err) console.log("Error Selecting: %s", error);
           if (!product) {
               return res.render("404");
           }

           product.productNumber = req.body.pnumber;
           product.productName = req.body.pname;
           product.productDescription = req.body.pdescription;
           product.productPrice = req.body.pprice;
           product.productQuantity = req.body.pquantity;

            product.save(function(err) {
                if (err) {
                    console.log("Error: %s", err);
                }
                res.redirect('/products');
            });
        });
    };