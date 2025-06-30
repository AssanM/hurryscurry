import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // формат: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // используй свой секрет
    req.user = decoded; // теперь доступно как req.user._id
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid token." });
  }
};

export default verifyToken;