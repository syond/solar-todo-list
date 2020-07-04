const jwt       = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "No token provided" });

  const authHeaderSplit = authHeader.split(" ");

  if (!authHeaderSplit.length === 2)
    return res.status(401).send({ error: "Token error" });

  const [prefix, token] = authHeaderSplit;

  if (!/^Bearer$/i.test(prefix))
    return res.status(401).send({ error: "Token format invalid" });

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error) return res.status(401).send({ error: "Token invalid" });

    req.userId = decoded.id;

    return next();
  });
};
