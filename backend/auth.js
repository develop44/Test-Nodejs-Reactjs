const jwt = require("jsonwebtoken");

const config = require("./config");

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.send({error: true, message: "Le token est requis!"});
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({error: true, message:"Token invalid"});
  }
  return next();
};

module.exports = verifyToken;