const mongoose = require("mongoose");
const month = `${new Date().getFullYear()}${(new Date().getMonth() + 1)
  .toString()
  .padStart(2, "0")}`;

const logsInputDailyPlanModel = require("./logsInputDailyPlanSchema");

const dailyPlanSchema = new mongoose.Schema(
  {
    "Customer short name": { type: String, require: true },
    "Project Code as PIM": { type: String, require: true },
    "Project name as PIM": { type: String, require: true },
    "Service Type": { type: String, require: true },
    "Project Type": { type: String, require: true },
    TAT: { type: String, require: true },
    "Average Speed (min)": { type: Number, require: true },
    "Billing Unit": { type: String, require: true },
    "Team name": { type: String, require: true },
    "HEAD of team": { type: String, require: true },
    Plan: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { versionKey: false, timestamps: true }
);

/*  baseSchema.index(
      { "Project name as PIM": 1, "Billing Unit": 1 },
      { unique: true }
    ); */

dailyPlanSchema.pre("findOneAndUpdate", async function (next) {
  this._tempOldData = await this.model.findOne(this.getQuery());
  next();
});

dailyPlanSchema.post("findOneAndUpdate", async function (doc) {
  const oldData = await this._tempOldData;
  const updatedFields = {};

  for (const field in this._update.$set) {
    if (this._update.$set.hasOwnProperty(field)) {
      if (
        JSON.stringify(this._update.$set[field]) !==
        JSON.stringify(oldData[field])
      ) {
        if (field !== "updatedAt") {
          updatedFields[field] = this._update.$set[field];
        }
      }
    }
  }

  if (Object.keys(updatedFields).length === 0) {
    return;
  }
  const user = doc.username;

  await logsInputDailyPlanModel.create({
    dataId: doc._id,
    oldData,
    updatedFields,
    username: user,
  });
});

dailyPlanSchema.pre("findOneAndUpdate", function (next) {
  const updateFields = this.getUpdate();
  if (Object.keys(updateFields)) {
    this._update.updatedAt = new Date();
  }
  next();
});

// Biên dịch và trả về model
const dailyPlanModel = mongoose.model(`daily_plan_${month}`, dailyPlanSchema);

module.exports = dailyPlanModel;
