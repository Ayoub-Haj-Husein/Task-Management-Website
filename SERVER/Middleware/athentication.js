require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    // Log the decoded token for debugging
    console.log("Decoded Token:", decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
    // Log the error for debugging
    console.error("JWT Verification Error:", error);
    
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}

module.exports = {
  verifyJWT,
};