import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import Ticket from "../models/Ticket.js";

export const addStudentByAdmin = async (req, res) => {
  try {
    const { name, rollNumber, email, dob } = req.body;

    if (!name || !rollNumber || !email || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingStudent = await Student.findOne({
      $or: [{ rollNumber }, { email }],
    });

    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student with this Roll No or Email already exists" });
    }

    const formattedName = name.trim().slice(0, 4).toUpperCase(); 
    const day = dob.split("-")[2]; 
    const year = dob.split("-")[0].slice(-4); 
    const plainPassword = `${formattedName}${day}${year}`; 

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newStudent = await Student.create({
      name: name.trim(),
      rollNumber: rollNumber.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Student added successfully by admin",
      student: { name: newStudent.name, email: newStudent.email },
      password: plainPassword,
    });
  } catch (error) {
    console.error("Admin Add Student Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const deleteTicketByAdmin = async (req, res) => {
  try {
    const ticketId = req.params.id;

    const deleted = await Ticket.findByIdAndDelete(ticketId);

    if (!deleted) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    console.error("Delete Ticket Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateTicketStatus = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ 
      message: "Status updated successfully", 
      ticket: updatedTicket 
    });

  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
