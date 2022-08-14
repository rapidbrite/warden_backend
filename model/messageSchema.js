const mongoose = require("mongoose");
const { Schema } = mongoose;


const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    senderUserName: {
        type: String,
        required: true,
    },
    senderAvatar: {
        type: String,
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Message = mongoose.model("message", messageSchema);

module.exports = Message;


