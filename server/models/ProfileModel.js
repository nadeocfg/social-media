import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
