const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  pernr: { type: String, require: true },
  gdud: { type: String },
  isManager: { type: Boolean },
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
