import mongoose from "mongoose";

const fillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

const JugFill = mongoose.model("JugFill", fillSchema);
export default JugFill;
