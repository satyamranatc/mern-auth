import jwt from "jsonwebtoken";
import "dotenv/config";

const authMiddleware = (req, res, next) => {
  try {
    // Geting token from authorization header
    const authHeader = req.headers.authorization;
    
    // Checking if authorization header exists
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Checking format of authorization header
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: "Invalid token format. Use 'Bearer TOKEN'" });
    }

    const token = parts[1];

    // Verifying token
    const decoded = jwt.verify(token, process.env.JWT_Secrate);
    
    // Adding user data to request object
    req.user = decoded;
    
    // Continue to the next middleware/route handler
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token." });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired." });
    } else {
      console.error("Auth middleware error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
};

export default authMiddleware;