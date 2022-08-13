const mongoose = require("mongoose");
const invitationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const Invitation = mongoose.model("invitation", invitationSchema);

module.exports = Invitation;
