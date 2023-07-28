const jwt = require("jsonwebtoken");
const XLSX = require("xlsx");
const fs = require("fs");
const { getDatabase } = require("../middlewaves/getDatabase.js");
const logger = require("../middlewaves/logger.js");
const {
  VolumeModel,
  UserModel,
  LogsVolumeModel,
} = require("../schemas/mySchema.js");
const { default: mongoose } = require("mongoose");

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

const getRoot = (req, res) => {
  return res.send("Welcome to backend express server!");
};

const getUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // const database = await getDatabase("operation");
    /* const userCollection = database.collection("users");
    const user = await userCollection.findOne({ username: username }); */

    const user = await UserModel.findOne({ username: username });

    if (!user || user.password !== password) {
      loggerError.error("Invalid username or password");
      res.status(400).json({ error: "Invalid username or password" });
    } else {
      loggerInfo.info("Login successful");

      const token = jwt.sign({ username }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRE_TOKEN_IN,
      });
      // req.session.user = user;
      // req.session.user.group = user.group;
      // res.cookie("user_id", user._id, {
      //   maxAge: Number(process.env.SESSION_LIFE_TIME),
      // });
      return res.json({
        token,
        expiresIn: process.env.EXPIRE_TOKEN_IN,
        receivedTime: new Date(),
      });
    }
  } catch (err) {
    loggerError.error(err);
  }
};

const uploadVolume = (req, res) => {
  // const workbook = XLSX.utils.book_new();
  try {
    let readStream = fs.createReadStream(req.file.path);
    let data = [];

    readStream.on("data", (chunk) => {
      data.push(chunk);
    });

    readStream.on("end", async () => {
      const buffer = Buffer.concat(data);
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils
        .sheet_to_json(worksheet, {
          header: 0,
          defval: ""
        })
        .map((object) => {
          delete object.__EMPTY;
          return object;
        });

      if (jsonData.length > 0) {
        try {
          const insertDB = await VolumeModel.insertMany(jsonData, { ordered: false });

          const authHeader = req.headers["authorization"];
          const token = authHeader && authHeader.split(" ")[1];
          const username = jwt.decode(token, process.env.SECRET_KEY).username;

          const headerFileUpload = Object.keys(jsonData[0]);
          const logs = {
            file_header: headerFileUpload,
            function: "upload weekly plan",
            user_upload: username,
            project_list: jsonData.map((object) => {
              return ["Project name as PIM"];
            }),
            isSuccess: true
          };

          const insertLogsDB = await LogsVolumeModel.create(logs);
          return res.json("File uploaded successful!");
        } catch (error) {
          loggerError.error("Error while inserting data into DB:", error);
          return res.status(500).json(error);
        } finally {
          fs.unlink(req.file.path, (err) => {
            if (err) {
              loggerError.error("Error while deleting the file:", err);
            } else {
              loggerInfo.info("File upload has been deleted successfully!");
            }
          });
        }
      } else {
        return res.status(400).json("No data found in the uploaded file.");
      }

    });
  } catch (error) {
    loggerError.error("Error while processing the uploaded file:", error);
    return res.status(500).json(error);
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

    const existingData = await VolumeModel.findOne({ _id: new ObjectId("64c31c43c0e8ee5e3795d314") });

    let dataFromClient = {
      "Customer short name": "Lê Hoàng Minh Khang",
      "HEAD of team": "Khang Lê",
      "username": "Khang"
    }

    if (existingData) {
      await VolumeModel.findOneAndUpdate({ _id: new ObjectId("64c31c43c0e8ee5e3795d314") }, dataFromClient);
      console.log('Cập nhật thành công!');
    } else {
      // Nếu không tồn tại, thực hiện lưu mới
      await VolumeModel.create(dataFromClient);
      console.log('Lưu mới thành công!');
    }

    return res.status(200).json("Updated data successful!");

    // return result;
  } catch (error) {
    loggerError.error(error);
  }
};

module.exports = {
  getNavbarItem,
  getRoot,
  getUser,
  uploadVolume,
  getDailyData,
};
