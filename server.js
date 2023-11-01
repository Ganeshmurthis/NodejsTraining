const express = require('express');
const cors = require('cors');

const app = express(); // to access the rest api

//DB connection
app.use(express.json());
const db = require("./model");

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the DB!");
})
.catch(err => {
    console.log("Cannot connect to the Database!", err);
    process.exit();
});

//Access API URL
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

require("./routes/product.route")(app);
require("./routes/cart.route")(app);
require("./routes/auth.route")(app);
//require("./routes/index.route")(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    //next();
});
const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
});