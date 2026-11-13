const mongoose = require("mongoose");
const bcrypt= require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  // If the password was not changed, do nothing (avoids hashing a hash)
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// Used at login: compares the typed password with the stored hash
userSchema.methods.comparePassword = function (typedPassword) {
  return bcrypt.compare(typedPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
