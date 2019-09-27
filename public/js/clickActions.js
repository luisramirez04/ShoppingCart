function addProduct() {
    window.location.href = "/products/add";
}

function cancelAdd() {
    window.location.href = "/products";
}

function cancelOrder() {
    window.location.href = "/shopping/products";
}

function cancelEdit() {
    window.location.href = document.referrer;
}

function viewOrders(shopper) {
    window.location.href = `/shopping/orders/customers/${shopper}`;
}

function continueShopping() {
    window.location.href = "/shopping/";
}

