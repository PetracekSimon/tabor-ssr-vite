import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 400,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  blogger_id: {
    type: Number,
    required: false,
  },
  role: {
    type: String,
    required: true,
    default: "Admin",
  },
});

export default mongoose.model("Users", usersSchema);
