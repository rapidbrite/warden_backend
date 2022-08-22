const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskStatusSchema = new mongoose.Schema({
    channelId: {
        type: Schema.Types.ObjectId,
        ref: "channel",
    },
    taskStatusName: {
        type: String,
        required: true,
    },
    taskArray: [{
        type: Schema.Types.ObjectId,
        ref: "task",
    }]
});

const TaskStatus = mongoose.model("taskStatus", TaskStatusSchema);
module.exports = TaskStatus;