const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "myjwtkey");
  } catch (error) {
    throw error;
  }

  if (!decodedToken) {
    res.status(401).json({ message: "Not authenticated" });
  }

  req.userId = decodedToken.userId;
  next();
};
