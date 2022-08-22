const mongoose = require("mongoose");
const { Schema } = mongoose;
const channelSchema = new mongoose.Schema({
  channelId: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  channelName: {
    type: String,
    required: true,
  },
  channelKey: {
    type: String,
    //required: true,
  },
  channelDescription: {
    type: String,
  },
  channelType: {
    type: String,
  },
  currentTaskNumber: {
    type: Number,
    default: 0,
  },
  members: [{
    type: String,
    }],
  taskStatus: [
    {
      type: Schema.Types.ObjectId,
      ref: "taskStatus",
    },
  ],

  // users : [{
  //     type: Schema.Types.ObjectId,
  //     ref : 'user'
  // }],
});

const Channel = mongoose.model("channel", channelSchema);

module.exports = Channel;
