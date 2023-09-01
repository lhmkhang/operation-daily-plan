const logger = require("../helpers/logger");
const dailyPlanModel = require("../models/dailyPlanSchema");
const trackingIssueModel = require("../models/trackingIssueSchema");

const loggerError = logger.getLogger("errorLogger");
const loggerInfo = logger.getLogger("infoLogger");

const getNavbarItem = async (req, res) => {
  try {
    const database = await getDatabase("operation");
    const collection = database.collection("menu_item");
    const list_item = await collection.findOne({}, { projection: { _id: 0 } });
    return res.json(list_item);
  } catch (error) {
    loggerError.error(error);
  }
};

const getDailyData = async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const { ObjectId } = mongoose.Types;
    /* let month = new Date().toISOString().split("T")[0].split("-").join("");
    const database = await getDatabase("operation");
    const collection = database.collection(`volume_${month}`);
    const date = "2023-07-12";

    const result = await collection
      .aggregate([
        {
          $addFields: {
            data: {
              $objectToArray: "$$ROOT",
            },
          },
        },
        {
          $project: {
            data: {
              $filter: {
                input: "$data",
                as: "item",
                cond: {
                  $or: [
                    {
                      $not: {
                        $regexMatch: {
                          input: "$$item.k",
                          regex: /Forecast|Plan|Real/,
                        },
                      },
                    },
                    {
                      $regexMatch: {
                        input: "$$item.k",
                        regex: new RegExp(date),
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $arrayToObject: "$data",
            },
          },
        },
      ])
      .toArray(); */

    // const existingData = await VolumeModel.findOne({
    //   _id: new ObjectId("64c475ec714608654db194d9"),
    // });

    const existingData = await dailyPlanModel.findOne({
      _id: new ObjectId("64c708f6a239ac341c86b0e1"),
    });
    let dataFromClient = {
      "Project name as PIM": "Nguyễn Thị Kiều Hoanh",
      "Service Type": "Data Entry",
      Plan: {
        "2023-07-10": {
          Forecast: "1000",
          Plan: "1000",
          Real: "1500",
        },
        "2023-07-11": {
          Forecast: "",
          Plan: "",
          Real: "",
        },
        "2023-07-12": {
          Forecast: "",
          Plan: "",
          Real: "",
        },
        "2023-07-13": {
          Forecast: "",
          Plan: "",
          Real: "",
        },
        "2023-07-14": {
          Forecast: "",
          Plan: "",
          Real: "",
        },
        "2023-07-15": {
          Forecast: "",
          Plan: "",
          Real: "",
        },
        "2023-07-16": {
          Forecast: "",
          Plan: "",
          Real: "",
        },
        "Week 29": {
          Forecast: 300000,
          Plan: 291000,
          Real: 328500,
        },
      },
    };

    if (existingData) {
      await dailyPlanModel.findOneAndUpdate(
        { _id: new ObjectId("64c708f6a239ac341c86b0e1") },
        dataFromClient
      );
      loggerInfo.info("Cập nhật thành công!");
    } else {
      // Nếu không tồn tại, thực hiện lưu mới
      await VolumeModel.create(dataFromClient);
      loggerInfo.info("Lưu mới thành công!");
    }

    return res.status(200).json("Updated data successful!");
  } catch (error) {
    loggerError.error(error);
  }
};

const getIncidentData = async (req, res) => {
  try {
    const existingData = await trackingIssueModel.find({});

    if (existingData) {
      return res.status(200).json(existingData);
    } else {
      return res.status(400).json({ message: "process fail" });
    }
  } catch (error) {
    loggerError.error(error);
  }
};

const getHomePage = async (req, res) => {
  return res.render("home");
};

const getChangePasswordPage = (req, res) => {
  return res.render("changePassword");
};

const getLoginPage = (req, res) => {
  return res.render("login");
};

const getCreateUserPage = (req, res) => {
  return res.render("createUser");
};

module.exports = {
  getNavbarItem,
  getDailyData,
  getIncidentData,
  getHomePage,
  getChangePasswordPage,
  getLoginPage,
  getCreateUserPage,
};
