const jwt = require("jsonwebtoken")

const verifyToken = (token) => {
  return jwt.verify(token, "b");
};

module.exports = verifyToken