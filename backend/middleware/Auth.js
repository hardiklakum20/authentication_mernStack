const jwt = require('jsonwebtoken');

const ensureAuthantication = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) return res.status(401).send({ message: "Unauthorized" });
    try {
        const decode = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).send({ message: "Unauthorized, JWT Wrong or Expired " });
    }
}

module.exports = { ensureAuthantication }