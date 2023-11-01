module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            ProductID: String,
            Quantity: Number,
            TotalPrice: Number
        }
    )

    schema.method("toJSON", function () {
        const { __v, id, ...object } = this.toObject();
        object.id = id;
        return object;
    });

    const CartModel = mongoose.model("cart", schema);
    return CartModel;
};