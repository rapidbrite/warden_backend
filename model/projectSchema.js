const mongoose = require("mongoose");
const { Schema } = mongoose;


const projectSchema = new mongoose.Schema({
    projectId : {
        type : String,
        required : true
    },
    projectIcon : {
        type : String,
    },
    projectKey : {
        type : String,  
        required : true
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    category : {
        type : String,
    },
    currentChannelKey : {
        type : String,
        default : '',
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    admin : [{
            type: Schema.Types.ObjectId,
            ref : 'user'
    }],
    users : [{
          type: Schema.Types.ObjectId,
          ref : 'user'
    }],
    invitations : [{
        type: Schema.Types.ObjectId,
        ref : 'invitation'
    }],
    messages : [{
        type: Schema.Types.ObjectId,
        ref : 'message'
    }],
    channels : [{
        type: Schema.Types.ObjectId,
        ref : 'channel'
    }],
})

const Project = mongoose.model("project",projectSchema);

module.exports = Project;


