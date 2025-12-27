import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

export const loginStudent = async (req, res) => {
  try {
    const { rollNumber, email, password } = req.body;

    if (!password || (!rollNumber && !email)) {
      return res.status(400).json({
        message: "Please enter your Roll Number or Email and Password",
      });
    }

    const student = await Student.findOne({
      $or: [
        { rollNumber: rollNumber?.trim() },
        { email: email?.trim().toLowerCase() },
      ],
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: student._id, name: student.name, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "✅ Login successful",
      token,
      student,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
