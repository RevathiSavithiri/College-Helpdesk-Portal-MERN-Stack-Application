import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user=null;

    if(decoded.role === 'student'){
      user = await Student.findById(decoded.id);
    }else if(decoded.role === "admin"){
      user = await Admin.findById(decoded.id);
    }
    
    if(!user) return res.status(404).json({message:"User not found"});

    req.user =  user;
    req.user.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
     return next();
  } else {
    return res.status(403).json({ message: "Access denied — Admins only" });
  }
};

export const protect = verifyToken;
