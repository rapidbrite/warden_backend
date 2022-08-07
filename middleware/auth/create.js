const jwt = require("jsonwebtoken");

createToken = (userName) => {
  return jwt.sign({ userName }, process.env.JWT_SECRET, {
    expiresIn: '7d', // 1 week
  });
};

module.exports = createToken;