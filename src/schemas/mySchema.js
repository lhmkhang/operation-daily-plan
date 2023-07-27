const mongoose = require("mongoose");

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
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

volumeSchema.pre("save", function (next) {
  this.updatedDate = new Date();
  next();
});

volumeSchema.index(
  { "Project name as PIM": 1, "Billing Unit": 1 },
  { unique: true }
);

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  group: { type: String, require: true },
});

userSchema.pre("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const logsVolumeSchema = new mongoose.Schema(
  {
    file_header: { type: Array, require: true },
    function: { type: String, require: true },
    user_upload: { type: String, require: true },
    project_list: { type: Array, require: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

logsVolumeSchema.pre("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const month = new Date().toISOString().split("T")[0].split("-").join("");
const VolumeModel = mongoose.model(`volume_${month}`, volumeSchema);
const UserModel = mongoose.model("User", userSchema);
const LogsVolumeModel = mongoose.model(
  `volume_logs_${month}`,
  logsVolumeSchema
);

module.exports = { VolumeModel, UserModel, LogsVolumeModel };
