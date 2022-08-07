const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    id : {
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
    owner : {
        type : String,
        required : true
    },
    admin : [{
            type: Schema.Types.ObjectId,
            ref : 'user'
    }],
    users : [{
          type: Schema.Types.ObjectId,
          ref : 'user'
    }]
})

const Project = mongoose.model("project",projectSchema);

module.exports = Project;


