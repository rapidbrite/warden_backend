const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        index: true
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
    }],
    notifications: [{
        type: Schema.Types.ObjectId,
        ref : 'notification'
    }]
})

userSchema.plugin(mongoose_fuzzy_searching, { fields: ['userName'] });
const User = mongoose.model("user",userSchema);

module.exports = User;


