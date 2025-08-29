import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    formType: { type: String, required: true }, // "career", "inquiry", "contact", "query"
    name: String,
    email: String,
    mobile: String,
    phone: String,
    pincode: String,
    position: String,
    type: String,
    message: String,
    privacy: Boolean,
    resume: String, // file path for uploaded CV
    extraData: { type: Object }, // fallback for anything new
  },
  { timestamps: true }
);

export default mongoose.model("Form", formSchema);