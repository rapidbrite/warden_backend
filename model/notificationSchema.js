const mongoose = require("mongoose");
const { Schema } = mongoose;
const notificationSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    invitation: {
        type: Schema.Types.ObjectId,
        ref : 'invitation',
    },
    status: {
        type: String,
        enum: ["unread", "read"],
        default: "unread",
    },
    title:{
        type: String,
    },
    Message: {
        type: String,
    },
});
const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;