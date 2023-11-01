module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            description: String,
            price: Number,
            model: String
        }
    )

    schema.method("toJSON", function () {
        const { __v, id, ...object } = this.toObject();
        object.id = id;
        return object;
    });

    const Product = mongoose.model("product", schema);
    return Product;
};