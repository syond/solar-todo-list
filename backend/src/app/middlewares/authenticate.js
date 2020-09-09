const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(401).send({ error: "No token provided" });

  const authHeaderSplit = authHeader.split(" ");

  if (!authHeaderSplit.length === 2)
    return response.status(401).send({ error: "Token error" });

  const [prefix, token] = authHeaderSplit;

  if (!/^Bearer$/i.test(prefix))
    return response.status(401).send({ error: "Token format invalid" });

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) return response.status(401).send({ error: "Token invalid" });

    request.userId = decoded.user_id;

    return next();
  });
};
