const jwt = require("jsonwebtoken");
const XLSX = require("xlsx");
const fs = require("fs");
const { getDatabase } = require("../middlewaves/getDatabase.js");
const logger = require("../middlewaves/logger.js");

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
    const database = await getDatabase("operation");
    const userCollection = database.collection("users");
    const user = await userCollection.findOne({ username: username });

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
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 0,
        defval: "",
      }).map((object) => {
        delete object.__EMPTY;
        return object;
      });

      // console.log(jsonData);

      // const csvData = XLSX.utils.sheet_to_csv(worksheet)

      if (jsonData.length > 0) {
        try {
          const database = await getDatabase("operation");
          let month = new Date().toISOString().split("T")[0].split("-").join("");
          const collection = database.collection(`volume_${month}`);
          const insertDB = collection.insertMany(jsonData);

          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error("Error while deleting the file:", err);
            }
          });

          const authHeader = req.headers["authorization"];
          const token = authHeader && authHeader.split(" ")[1];
          const username = jwt.decode(token, process.env.SECRET_KEY).username;

          const headerFileUpload = Object.keys(jsonData[0]);
          const logs = {
            file_header: headerFileUpload,
            function: "upload weekly plan",
            user_upload: username,
            project_list: jsonData.map(object => {
              return object["Project name as PIM"]
            }),
            created_date: new Date()
          }

          const logsCollection = database.collection(`volume_logs_${month}`)
          const insertLogsDB = logsCollection.insertOne(logs);

        } catch (error) {
          loggerError.error("Error while inserting data into DB:", error);
        }
      }
    });
    return res.json("File uploaded successful!");
  } catch (error) {
    loggerError.error("Error while processing the uploaded file:", error);
    return res.status(500).json("File processing failed.");
  }
};

const getDailyData = async (req, res) => {
  try {
    let month = new Date().toISOString().split("T")[0].split("-").join("");
    const database = await getDatabase("operation");
    const collection = database.collection(`volume_${month}`);
    const date = '2023-07-12';

    const result = await collection.aggregate([
      {
        $addFields: {
          data: {
            $objectToArray: "$$ROOT"
          }
        }
      },
      {
        $project: {
          data: {
            $filter: {
              input: "$data",
              as: "item",
              cond: {
                $or: [
                  { $not: { $regexMatch: { input: "$$item.k", regex: /Forecast|Plan|Real/ } } },
                  { $regexMatch: { input: "$$item.k", regex: new RegExp(date) } }
                ]
              }
            }
          }
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $arrayToObject: "$data"
          }
        }
      }
    ]).toArray();

    res.status(200).json({
      message: `Get daily data of ${date} successful!`
    })

    return result;
  } catch (error) {
    loggerError.error(error);
  }
}

module.exports = { getNavbarItem, getRoot, getUser, uploadVolume, getDailyData };
