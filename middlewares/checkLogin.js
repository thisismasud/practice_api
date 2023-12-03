const jwt = require("jsonwebtoken");

const checkLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET); //it returns payload and expire time

    const { username, userId } = decoded;
    req.username = username;
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json("JWT verification error:", error.message);
  }
};

module.exports = checkLogin;
