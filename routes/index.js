var express = require('express');
var router = express.Router();

var displayProducts = require("./admin_routes/displayProducts");
var addProduct = require("./admin_routes/addProduct");
var saveProduct = require("./admin_routes/saveProduct");
var editProduct = require("./admin_routes/editProduct");
var saveAfterEdit = require("./admin_routes/saveAfterEdit");
var deleteProduct = require("./admin_routes/deleteProduct");
var displayCustomers = require("./admin_routes/displayCustomers");
var displayCustomerOrders = require("./admin_routes/displayCustomerOrders");
var editCustomerOrders = require("./admin_routes/editOrder");
var saveOrderAfterEdit = require("./admin_routes/saveOrderAfterEdit");
var deleteOrder = require("./admin_routes/deleteOrder");

var displayProductsShopping = require("./customer_routes/displayProducts");
var orderProduct = require("./customer_routes/orderProduct");
var saveOrder = require("./customer_routes/saveOrder");
var customerOrders = require("./customer_routes/customerOrders");

//start administrative routes
router.get('/', function(req, res, next) {
    res.redirect('/products');
});

router.get('/products', displayProducts);

router.get('/products/add', addProduct);
router.post('/products/add', saveProduct);

router.get('/products/edit/:id', editProduct);
router.post('/products/edit/:id', saveAfterEdit);

router.get('/products/delete/:id', deleteProduct);

router.get('/customers', displayCustomers);

router.get('/customers/:id', displayCustomerOrders);

router.get('/customers/:id/edit/:id', editCustomerOrders);
router.post('/customers/:id/edit/:id', saveOrderAfterEdit);

router.get('/customers/:id/delete/:id', deleteOrder);

//start customer shopping and ordering routes
router.get('/shopping/', function(req, res, next) {
    res.redirect('/shopping/products');
});

router.get("/shopping/products", displayProductsShopping);

router.get("/shopping/products/:id", orderProduct);
router.post("/shopping/products/:id", saveOrder);

router.get("/shopping/orders/customers/:id", customerOrders);


module.exports = router; 
