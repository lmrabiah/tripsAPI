const { JWT_SECRET, JWT_EXPIRATION_MS } = require("./keys");
module.exports = {
  JWT_SECRET: "asupersecretkey",
  JWT_EXPIRATION_MS: Date.now() + parseInt(JWT_EXPIRATION_MS),
};
