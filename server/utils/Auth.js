require("dotenv").config();
const { expressjwt: expressJwt } = require("express-jwt");
const jwks = require("jwks-rsa");

module.exports = {
  Auth: expressJwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.JWKS_URI,
    }),
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER,
    algorithms: [process.env.ALGORITHMS],
  }),
};
