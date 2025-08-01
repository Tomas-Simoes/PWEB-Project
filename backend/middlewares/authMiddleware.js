const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => { 
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); 
  } catch (err) {
    console.error('Error verifying token:', err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
