const mongoose = require("mongoose");
const invitationSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    projectName : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    }
})


const Invitation = mongoose.model("invitation",invitationSchema);

module.exports = Invitation;
