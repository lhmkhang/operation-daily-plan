const mongoose = require("mongoose");
const month = `${new Date().getFullYear()}${(new Date().getMonth() + 1)
  .toString()
  .padStart(2, "0")}`;

const logsInputDailyPlanModel = require("./logsInputDailyPlanSchema");

const trackingIssueSchema = new mongoose.Schema(
  {
    "PROJECT NAME": { type: String, require: true },
    "ISSUE DESCRIPTION": { type: String, require: true },
    STATUS: { type: String, require: true },
    PRIORITY: { type: String, require: true },
    ASSIGNEE: { type: String, require: true },
    "OPEN AT": { type: String, require: true },
    "CLOSE AT": { type: String, require: true },
    COMMENTS: { type: String, require: true },
    "ROOT CAUSES": { type: String, require: true },
    "CORRECTIVE / PREVENTIVE ACTIONS": { type: String, require: true },
    "ROOT CAUSE CATEGORY": { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);

/*  baseSchema.index(
      { "Project name as PIM": 1, "Billing Unit": 1 },
      { unique: true }
    ); */

trackingIssueSchema.pre("findOneAndUpdate", async function (next) {
  this._tempOldData = await this.model.findOne(this.getQuery());
  next();
});

trackingIssueSchema.post("findOneAndUpdate", async function (doc) {
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

trackingIssueSchema.pre("findOneAndUpdate", function (next) {
  const updateFields = this.getUpdate();
  if (Object.keys(updateFields)) {
    this._update.updatedAt = new Date();
  }
  next();
});

// Biên dịch và trả về model
const trackingIssueModel = mongoose.model(
  `incident_tracking_${month}`,
  trackingIssueSchema
);

module.exports = trackingIssueModel;
