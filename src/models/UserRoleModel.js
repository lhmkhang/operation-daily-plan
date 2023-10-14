const mongoose = require("mongoose");

const UserRoleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    userId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    functional: {
      type: mongoose.Schema.Types.Map,
      default: {}
    }

  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "modifiedDate",
    },
  }
);

const UserRoleModel = mongoose.model("User_Role", UserRoleSchema);
module.exports = { UserRoleModel };
