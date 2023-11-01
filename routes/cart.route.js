module.exports = app => {

    const carts = require("../controller/cart.controller");
    
    var router = require("express").Router();
    
    // Get a All Products
    // Access REST API methods(GET, POST, PUT, DELETE)
    router.get("/", carts.ShowAllCart);
    
    app.use("/api/cart", router);


};
