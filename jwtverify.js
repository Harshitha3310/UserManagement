
// Verify Token
module.exports = function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    console.log(bearerHeader);
    req.token = bearerHeader;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.status(403).json({ message: "sorry access token is required !" });
  }
};
