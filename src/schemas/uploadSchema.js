const mongoose = require("mongoose");
const month = `${new Date().getFullYear()}${(new Date().getMonth() + 1)
  .toString()
  .padStart(2, "0")}`;

const volumeSchema = new mongoose.Schema(
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
    "Forecast 2023-07-10": { type: Number, require: true },
    "Plan 2023-07-10": { type: Number, require: true },
    "Real 2023-07-10": { type: Number, require: true },
    "Forecast 2023-07-11": { type: Number, require: true },
    "Plan 2023-07-11": { type: Number, require: true },
    "Real 2023-07-11": { type: Number, require: true },
    "Forecast 2023-07-12": { type: Number, require: true },
    "Plan 2023-07-12": { type: Number, require: true },
    "Real 2023-07-12": { type: Number, require: true },
    "Forecast 2023-07-13": { type: Number, require: true },
    "Plan 2023-07-13": { type: Number, require: true },
    "Real 2023-07-13": { type: Number, require: true },
    "Forecast 2023-07-14": { type: Number, require: true },
    "Plan 2023-07-14": { type: Number, require: true },
    "Real 2023-07-14": { type: Number, require: true },
    "Forecast 2023-07-15": { type: Number, require: true },
    "Plan 2023-07-15": { type: Number, require: true },
    "Real 2023-07-15": { type: Number, require: true },
    "Forecast 2023-07-16": { type: Number, require: true },
    "Plan 2023-07-16": { type: Number, require: true },
    "Real 2023-07-16": { type: Number, require: true },
    "Forecast Week 29": { type: Number, require: true },
    "Plan Week 29": { type: Number, require: true },
    "Real Week 29": { type: Number, require: true },
    username: { type: String, require: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

volumeSchema.index(
  { "Project name as PIM": 1, "Billing Unit": 1 },
  { unique: true }
);

const logsVolumeSchema = new mongoose.Schema(
  {
    file_header: { type: Array, require: true },
    function: { type: String, require: true },
    user_upload: { type: String, require: true },
    project_list: { type: Array, require: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    isSuccess: { type: Boolean, require: true },
  },
  { versionKey: false }
);

const logsDailyUpdateSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    dataId: { type: mongoose.Schema.Types.ObjectId, required: true },
    oldData: { type: mongoose.Schema.Types.Mixed },
    updatedFields: { type: mongoose.Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const LogDailyUpdateModel = mongoose.model(
  `logs_daily_plan_data_${month}`,
  logsDailyUpdateSchema
);

volumeSchema.pre("findOneAndUpdate", async function (next) {
  this._tempOldData = await this.model.findOne(this.getQuery());
  next();
});
volumeSchema.post("findOneAndUpdate", async function (doc) {
  const oldData = await this._tempOldData;
  const updatedFields = {};

  for (const field in this._update.$set) {
    if (this._update.$set.hasOwnProperty(field)) {
      if (
        JSON.stringify(this._update.$set[field]) !==
        JSON.stringify(oldData[field])
      ) {
        if (field !== "updatedDate") {
          updatedFields[field] = this._update.$set[field];
        }
      }
    }
  }

  if (Object.keys(updatedFields).length === 0) {
    return;
  }
  const user = doc.username;

  await LogDailyUpdateModel.create({
    dataId: doc._id,
    oldData,
    updatedFields,
    username: user,
  });
});

volumeSchema.pre("findOneAndUpdate", function (next) {
  const updateFields = this.getUpdate();
  if (Object.keys(updateFields)) {
    this._update.updatedDate = new Date();
  }
  next();
});

const VolumeModel = mongoose.model(`volume_${month}`, volumeSchema);

const LogsVolumeModel = mongoose.model(
  `volume_logs_${month}`,
  logsVolumeSchema
);

module.exports = { VolumeModel, LogsVolumeModel, logsDailyUpdateSchema };
