const dbconfig = require("../config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise; // enable prmoise object DB and node

const db = {}; // DB connections properties to establisj
db.mongoose = mongoose;
db.url = dbconfig.url;
db.products = require("./product.model")(mongoose);
db.carts = require("./cart.model")(mongoose);

module.exports = db;