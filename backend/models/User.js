const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "organization", "student"], // Strict role control for relationship linking
    },
    // We can add 'account_status' from the image later when we implement approval flows.
    // Explicit relationships (student_id, etc.) will be linked in sub-schemas later.
  },
  { timestamps: true }, // Handles created_at / updated_at automatically
);

module.exports = mongoose.model("User", userSchema);
