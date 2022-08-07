const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true  
    },
    email : {
        type : String
    },
    avatar : {
        type : String
    },
    projects : [{
        type: Schema.Types.ObjectId,
        ref : 'project'
    }],
    invitations : [{
        type: Schema.Types.ObjectId,
        ref : 'invitation'
    }]
})

const User = mongoose.model("user",userSchema);

module.exports = User;


