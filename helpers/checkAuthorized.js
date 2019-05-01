
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");

    if(!authHeader) {
        req.isAuthorized = false;
        return next();
    }

    const token = authHeader.split(" ")[1];
    console.log(token + " is the token");

    if(!token || token === "") {
        req.isAuthorized = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "longsecretkey");
    } catch(err) {
        throw err;
    }

    if(!decodedToken) {
        req.isAuthorized = false;
        return next();
    }

    req.isAuthorized = true;
    req.userId = decodedToken.userID;
    console.log(decodedToken.userID + " is the userId");
    next();
}