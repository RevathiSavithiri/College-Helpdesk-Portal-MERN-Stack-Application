import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const email = "admin@rp@gmail.com";
    const plainPassword = "@dmin123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log("✅ Admin password updated");
    } else {
      await Admin.create({
        name: "Admin",
        rollNumber: "ADMIN001",
        email,
        password: hashedPassword,
        role: "admin"
      });
      console.log("✅ Admin created successfully");
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seedAdmin();
