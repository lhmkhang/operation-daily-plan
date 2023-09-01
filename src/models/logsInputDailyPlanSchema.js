const mongoose = require("mongoose");
const month = `${new Date().getFullYear()}${(new Date().getMonth() + 1)
  .toString()
  .padStart(2, "0")}`;

const logsInputDailyPlanSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    dataId: { type: mongoose.Schema.Types.ObjectId, required: true },
    oldData: { type: mongoose.Schema.Types.Mixed },
    updatedFields: { type: mongoose.Schema.Types.Mixed },
  },
  { versionKey: false, timestamps: true }
);

const logsInputDailyPlanModel = mongoose.model(
  `daily_plan_logs_${month}`,
  logsInputDailyPlanSchema
);

module.exports = logsInputDailyPlanModel;
