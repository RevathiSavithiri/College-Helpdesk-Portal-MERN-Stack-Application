import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({

  ticketId: { type: String, required: true, unique: true},
  student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
  
  subject: { type: String, required: true },
  message: { type: String, required: true },
  attachments: [
    {
      fileName: String,
      fileUrl: String,
      fileType: String
    }
  ],
  status: { type: String, default: "Pending", enum: ["Pending", "In-Progress", "Resolved"] }
}, { timestamps: true });

export default mongoose.model('Ticket', TicketSchema);

