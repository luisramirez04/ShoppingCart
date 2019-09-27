var Db = require('../../dbConnection');
var Product = Db.getModel();

module.exports = 
    function deleteProduct(req, res, next) {
        var id = req.params.id; 

        Product.findById(id, function (err, product) {
            if (err) console.log("Error Selecting : %s", err);
            if (!product) {
                return res.render("404");
            }
            
            product.remove(function(err) {
                if (err) console.log("Error Deleting: %s", err);
                res.redirect("/products");
            });
        });
    };