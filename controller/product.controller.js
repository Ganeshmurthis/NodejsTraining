const model = require("../model");
const products = model.products;

exports.showAll = (req, res) => {
    const title = req.query.title;
    //var condition = title ? { title: {$regex: new RegExp(title), $options: "i"}} : '';
    products.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products. "
            });
        });
};

exports.findProduct = (req, res) => {
    let pid = req.params.id;
    const data = getProductById(pid);
    if (data) {
        if (data.message) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product."
            });
        } else {
            res.send(data);
        }
    }

};

exports.getProductById = (id) => {
    const prod = new products();
    products.find({ "_id": id })
        .then(data => {
            prod = data;
        })
        .catch(err => {
            return {
                message: err.message || "Some error occurred while retrieving products. "
            };
        });
    return prod;
}

exports.CreateProduct = (req, res) => {
    debugger;
    if (!req.body.title) {
        res.status(400).send({ message: "Title cannot be empty" });
        return;
    }

    //Create a product
    const createProduct = new products({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        model: req.body.model
    });

    createProduct.save(createProduct)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product."
            });
        });
};

exports.UpdateProduct = (req, res) => {

    const updateProduct = new products({
        _id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        model: req.body.model
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
