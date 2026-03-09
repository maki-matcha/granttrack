// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// IMPORT UPDATED USER MODEL
const User = require("./models/User");

const app = express();

// --- SCHOLARSHIP SCHEMA (UNTOUCHED FROM TURN 1 & 2) ---
const scholarshipSchema = new mongoose.Schema({
  title: String,
  status: String,
  deadline: String,
  amount: String,
  level: String,
});
const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("✅ MongoDB successfully connected (Migration Active)"),
  )
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("GrantTrack API is running - Database Migration Enabled");
});

// --- GET ALL SCHOLARSHIPS (UNCHANGED) ---
app.get("/api/scholarships", async (req, res) => {
  try {
    const scholarships = await Scholarship.find({});
    res.status(200).json(scholarships);
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    res.status(500).json({ message: "Failed to fetch scholarships" });
  }
});

// --- ADD NEW SCHOLARSHIP (UNCHANGED) ---
app.post("/api/scholarships", async (req, res) => {
  try {
    const newScholarship = new Scholarship(req.body);
    await newScholarship.save();
    res.status(201).json({
      message: "Scholarship added successfully!",
      data: newScholarship,
    });
  } catch (error) {
    console.error("Error saving scholarship:", error);
    res.status(500).json({ message: "Failed to add scholarship" });
  }
});

// ==========================================================
// --- REWRITTEN REGISTRATION ROUTE (NEW STRUCTURE) ---
// ==========================================================
app.post("/api/register", async (req, res) => {
  try {
    // DESTUCTURE NEW FIRST/LAST NAME FIELDS sitting in req.body
    const { firstName, lastName, email, password, role } = req.body;

    // Update validation to check separate name fields
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check existing user (unchanged check, email is unique identifier)
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Create the new user with new structure
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // (Note: Hash this later in production turn)
      role,
    });

    // Save user - schema validation ensures firstName and lastName exist
    await newUser.save();

    res.status(201).json({
      message: `${role} user created successfully!`,
      // Return user data (minus password for security)
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// ==========================================================
// --- REWRITTEN LOGIN ROUTE (UNCHANGED LOGIC) ---
// ==========================================================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Unchanged finding logic
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Unchanged password check
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Unchanged role check
    if (user.role !== role) {
      return res.status(400).json({
        message: "Role mismatch. Select correct login portal.",
      });
    }

    // Success response - auto-sends full User object which now includes firstName/lastName
    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Migration complete. Server running on port ${PORT}`);
});
