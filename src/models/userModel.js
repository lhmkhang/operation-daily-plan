const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    group: { type: String, require: true, default: "user" },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };