const mongoose = require("mongoose");
const month = `${new Date().getFullYear()}${(new Date().getMonth() + 1)
  .toString()
  .padStart(2, "0")}`;

const logsUploadSchema = new mongoose.Schema(
  {
    file_header: { type: Array, require: true },
    function: { type: String, require: true },
    user_upload: { type: String, require: true },
    project_list: { type: Array, require: true },
    isSuccess: { type: Boolean, require: true },
  },
  { versionKey: false, timestamps: true }
);

const logsUploadModel = mongoose.model(
  `upload_logs_${month}`,
  logsUploadSchema
);

module.exports = logsUploadModel;
