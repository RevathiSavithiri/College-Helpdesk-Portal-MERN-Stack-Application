import express from "express";
import { addStudentByAdmin , deleteTicketByAdmin , updateTicketStatus} from "../controllers/adminController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-student", verifyToken, verifyAdmin, addStudentByAdmin);

router.delete("/ticket/:id", verifyToken, verifyAdmin, deleteTicketByAdmin);

router.put("/ticket/status/:id", verifyToken, verifyAdmin, updateTicketStatus);
export default router;
