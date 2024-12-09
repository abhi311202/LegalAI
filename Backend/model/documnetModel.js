import mongoose from "mongoose";

const DocumentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  serialnum: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  Class: {
    type: String,
    required: true,
  },
  adminid: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: String,
    required: true,
    // default: Date.now(),
  },
});

const Document = mongoose.model("Document", DocumentSchema);

export default Document;
