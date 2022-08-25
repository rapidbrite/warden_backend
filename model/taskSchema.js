const mongoose = require("mongoose");
const { Schema } = mongoose;
const TaskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true,
    },
    channelId : {
        type: Schema.Types.ObjectId,
        ref : 'channel'
    },
    taskKey : {
        type: String,
       // required: true,
    },
    taskName : {
        type : String,
        required : true
    },
    taskDescription : {
        type : String,
    },
    taskType : {
        type : String,
    },
    taskStatus : {
        type : String,
        
    },
    taskPriority : {
        type: String,
        enum : ['Highest','High', 'Normal', 'Low', 'Lowest'],
        default : 'Normal'
    },
    taskAssignee : {
        type : String,
    },
    taskReporter : {
        type : String,
    },
    taskCreatedDate: {
        type: Date,
        default: Date.now
    },
    taskUpdatedDate : {
        type : Date,
    },
    taskDueDate : {
        type : Date,
    },
    taskComments : [{
        type : Schema.Types.ObjectId,
        ref : 'comment'
    }],
    taskAttachments : [{
        type : Schema.Types.ObjectId,
        ref : 'attachment'
    }],
    taskHistory : [{
        type : Schema.Types.ObjectId,
        ref : 'history'
    }],
    taskSubTasks : [{
        type : Schema.Types.ObjectId,
        ref : 'task'
    }],
    taskParentTask : {
        type : Schema.Types.ObjectId,
        ref : 'task'
    }

});

const Task = mongoose.model("task", TaskSchema);
module.exports = Task;