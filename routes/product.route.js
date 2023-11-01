const authJwt = require("../middlewares/auth.jwt");
module.exports = app => {

    const products = require("../controller/product.controller");

    var router = require("express").Router();

    // Define a route that checks if the URL contain the api 

    router.use((req, res, next) => {
        debugger;
        if (req.originalUrl.includes('/api/')) {
            console.log(`url contains api`);
        }
        else {
            console.log(`url doesn't contains api`);
        }

        next();
    });

    // Get a All Products
    // Access REST API methods(GET, POST, PUT, DELETE)
    //router.get("/", products.showAll);
    router.get("/", [authJwt.verifyToken], products.showAll);
    router.get("/:id", products.findProduct);

    router.post("/create", products.CreateProduct);
    router.put("/update", products.UpdateProduct);
    router.delete("/delete/:id", products.DeleteProductByID);
    router.delete("/delete", products.DeleteAllProducts);

    app.use("/api/products", router);

};
