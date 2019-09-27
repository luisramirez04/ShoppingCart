var DB = require('../../dbConnection');
var Product = DB.getModel();

module.exports = 
    function displayProducts(req, res, next) { 
        let query = req.query; 
        switch (Object.keys(req.query).length) {
            //If number of queries is 0, return all products
            case 0: 
                res.format({ 
                    'application/json': () => {
                        Product.find({}, (err, products) => {
                            res.json(products);
                        });
                    }, 

                    'application/xml': () => {

                        Product.find({}, (err, products) => {
                            let productXml = 
                            '<?xml version="1.0"?>\n<products>\n' + 
                            products.map(function(product) {
                                return ' <product id="' + product._id + '">\n' + 
                                '  <productNumber>' + product.productNumber + '</productNumber>\n' + 
                                '  <productName>' + product.productName + '</productName>\n' +
                                '  <productDescription>' + product.productDescription + '</productDescription>\n' +
                                '  <productPrice>' + product.productPrice + '</productPrice>\n' +
                                '  <productQuantity>' + product.productQuantity + '</productQuantity>\n' +
                                ' </product>';
                            }).join('\n') + '\n</products>\n';

                            res.type('application/xml');
                            res.send(productXml);
                        });
                    }, 

                    'text/html': () => {
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
                            res.render('displayProductsView', 
                            {title:"List of Products", data: results});
                        });
                    }, 

                    'default': () => {
                        res.status(404);
                        res.send("<404 - Not Found </b>");           
                    }
                    
                });
                break;
            //if number of queries is one, the one query is assumed to be the name of the product
            case 1: 
                res.format({ 
                    'application/json': () => {
                        Product.find({ productName: query.name }, (err, products) => {
                            res.json(products);
                        });
                    }, 

                    'application/xml': () => {

                        Product.find({ productName: query.name }, (err, products) => {
                            let productXml = 
                            '<?xml version="1.0"?>\n<products>\n' + 
                            products.map(function(product) {
                                return ' <product id="' + product._id + '">\n' + 
                                '  <productNumber>' + product.productNumber + '</productNumber>\n' + 
                                '  <productName>' + product.productName + '</productName>\n' +
                                '  <productDescription>' + product.productDescription + '</productDescription>\n' +
                                '  <productPrice>' + product.productPrice + '</productPrice>\n' +
                                '  <productQuantity>' + product.productQuantity + '</productQuantity>\n' +
                                ' </product>';
                            }).join('\n') + '\n</products>\n';

                            res.type('application/xml');
                            res.send(productXml);
                        });
                    }, 

                    'text/html': () => {
                        Product.find({productName: query.name}, (err, products) => {
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
                            res.render('displayProductsView', 
                            {title:"List of Products", data: results});
                        });
                    }, 

                    'default': () => {
                        res.status(404);
                        res.send("<404 - Not Found </b>");           
                    }
                    
                });
                break;
            /*if query is of length 2, it is assumed that they are the minimum and maximum values for a price
            range search
            */
            case 2: 
                res.format({ 
                    'application/json': () => {
                        Product.find({ productPrice: {$gte: query.min, $lte: query.max }}, (err, products) => {
                            if(err) {
                                console.log('Error: %s ', err);
                            }
                            res.json(products);
                            
                        });
                    }, 

                    'application/xml': () => {
                        Product.find({ productPrice: {$gte: query.min, $lte: query.max }}, (err, products) => {
                            let productXml = 
                            '<?xml version="1.0"?>\n<products>\n' + 
                            products.map(function(product) {
                                return ' <product id="' + product._id + '">\n' + 
                                '  <productNumber>' + product.productNumber + '</productNumber>\n' + 
                                '  <productName>' + product.productName + '</productName>\n' +
                                '  <productDescription>' + product.productDescription + '</productDescription>\n' +
                                '  <productPrice>' + product.productPrice + '</productPrice>\n' +
                                '  <productQuantity>' + product.productQuantity + '</productQuantity>\n' +
                                ' </product>';
                            }).join('\n') + '\n</products>\n';

                            res.type('application/xml');
                            res.send(productXml);
                        });
                    }, 

                    'text/html': () => {
                        Product.find({ productPrice: {$gte: query.min, $lte: query.max }}, (err, products) => {
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
                            res.render('displayProductsView', 
                            {title:"List of Products", data: results});
                        });
                    }, 

                    'default': () => {
                        res.status(404);
                        res.send("<404 - Not Found </b>");           
                    }
                    
                });
                break;
            }
    };
