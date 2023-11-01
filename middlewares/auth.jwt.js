const jwt = require('jsonwebtoken'); // To generate validate/ refresh token

const config = require("../config/auth.config");

exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log(`Token is ${token}`);
    //let token = req.headers["bearer"]; this is for bearer
    if (!token) {
        return res.status(403)
            .send({
                messsage: "No token provided!"
            });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.log(`err is ${err}`);
            return res.status(401)
                .send({
                    messsage: "Unauthorized!"
                });
        }
        //returns the user details if valid
        console.log(`Decoded is ${decoded.toString()}`);
        next();
    });
};