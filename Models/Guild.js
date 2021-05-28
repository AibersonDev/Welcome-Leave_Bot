const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  guildID: {
    type: String,
    required: true,
    unique: true
  },
  welcomeType: {
    type: String
  },
  welcomeMessage: {
    type: String
  },
  welcomeChannelID: {
    type: String
  },
  leaveType: {
    type: String
  },
  leaveMessage: {
    type: String
  },
  leaveChannelID: {
    type: String
  }
});

module.exports = mongoose.model("Guild", guildSchema)