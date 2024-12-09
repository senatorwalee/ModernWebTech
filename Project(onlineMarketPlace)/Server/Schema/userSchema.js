import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  profilepic: { type: Buffer, required: false },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductPostings",
      default: [],
    },
  ],
}, { timestamps: true }); // Enables automatic timestamps

const User = mongoose.model("User", UserSchema);
export default User;
