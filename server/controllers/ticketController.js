import Ticket from "../models/Ticket.js";

const generateTicketId = () => {
  const now = new Date();

  const date = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `TKT-${date}${month}${year}-${hours}${minutes}${seconds}`;
};


export const createTicket = async (req, res) => {
  try {
    const user = req.user;        
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { subject, message } = req.body;
    if (!subject || !message) return res.status(400).json({ message: "subject & message required" });

    const attachments = (req.files || []).map(file => ({
      fileName:`${user.rollNumber}_${user.name.replace(/\s+/g, "")}_${file.originalname}`,
      fileUrl: `/uploads/${file.filename}`,
      fileType: file.mimetype
    }));

    const ticket = await Ticket.create({
      ticketId: generateTicketId(),
      student: user._id,
      subject,
      message,
      attachments
    });

    res.status(201).json(ticket);

  } catch (error) {
    console.error(" Ticket creation error:", error);
    res.status(500).json({ message: "Error creating ticket", error });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("student", "name email rollNumber department")
      .sort({ createdAt: -1 });

    return res.json(tickets);
  } catch (error) {
    console.error("Fetch all tickets error:", error);
    return res.status(500).json({ message: "Error fetching tickets", error });
  }
};



export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ student: req.user._id })
      .populate("student", "name email rollNumber department")
      .sort({ createdAt: -1 });

    return res.json(tickets);
  } catch (error) {
    console.error("Fetch my tickets error:", error);
    return res.status(500).json({
      message: "Error fetching student's tickets",
      error: error.message
    });
  }
};



export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
    return res.json(ticket);
  } catch (error) {
    return res.status(500).json({ message: "Error updating status", error });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    return res.json({ message: "Ticket deleted" });
   } catch (error) {
    console.error("Delete ticket error:",error);
    return res.status(500).json({ message: "Server error", error: error.message  });
  }
};
