const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    group: { type: Array, require: true, default: ["user"] },
    refreshToken: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'modifiedDate'
    }
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
