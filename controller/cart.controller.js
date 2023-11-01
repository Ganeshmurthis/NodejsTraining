const model = require("../model");
const cartModel = require("../model/cart.model");

const products = require("../controller/product.controller");

const Carts = model.carts;

exports.ShowAllCart = (req, res) => {

    Carts.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving carts. "
            });
        });
};

exports.UpdateProductById = (req, res) => {
    const pid = req.params.id;
    const product = products.getProductById(pid);

    const updateProduct = new cartModel({
        _id: req.body.id,
        ProductID: req.body.title,
        Quantity: req.body.Quantity,
        price: product.price * req.body.Quantity,
    });

    updateProduct.updateOne(updateProduct).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the product."
            });
        });
};

exports.DeleteProductByID = (req, res) => {
    debugger;
    if (req.params.id) {
        products.findByIdAndRemove(req.params.id, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete Products with id=${id}. Maybe Products was not found!`
                    });
                } else {
                    res.send({
                        message: "Products was deleted successfully!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Products with id=" + req.params.id
                });
            });
    }
    else {
        res.status(404).send({
            message: `Id is missing`
        });
    }
};

exports.DeleteAllProducts = (req, res) => {
    products.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Products were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Products."
            });
        });
}
