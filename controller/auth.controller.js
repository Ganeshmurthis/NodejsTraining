const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
// encrypt sensitive data using bcryptjs
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
    const token = jwt.sign({ id: 123 },
        config.secret,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400 // 24 hhours
        });
    res.status(200)
        .send({
            id: 123,
            username: "Test123",
            accessToken: token
        });
};