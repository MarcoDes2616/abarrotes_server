const crypto = require("crypto");

const generateCryptoToken = (num = 6) => {
  return crypto.randomBytes(num).toString("hex").toUpperCase();
};

module.exports = { generateCryptoToken };
