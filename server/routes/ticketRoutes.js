import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import {
  createTicket,
  getAllTickets,
  getMyTickets,
  updateTicketStatus,
  deleteTicket
} from "../controllers/ticketController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const user = req.user; 

    const cleanName = user.name.replace(/\s+/g, "");
    const newName = `${user.rollNumber}_${cleanName}_${file.originalname}`;

    cb(null, newName);
  }});
const upload = multer({ storage });


router.post("/", protect, upload.array("attachments", 5), createTicket);
router.get("/", getAllTickets);
router.get("/my-tickets", protect, getMyTickets);
router.put("/:id/status", protect, updateTicketStatus);
router.delete("/:id", protect, deleteTicket);

export default router;
