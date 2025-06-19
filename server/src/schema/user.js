import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    avatar: {
      type: String,
    },
    public_key: {
      type: String, // to store cloudinary key
    },
    role: {
      type: String,
      enum: ["User", "HR"],
      default: "User",
    },
    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AppliedJobs",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  const user = this;
  if (this.isModified("password")) {
    const hashedPassword = await argon2.hash(user.password);
    user.password = hashedPassword;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
