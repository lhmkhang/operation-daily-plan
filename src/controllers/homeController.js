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
      });
      // const csvData = XLSX.utils.sheet_to_csv(worksheet)

      console.log(jsonData.length);
    });
    return res.json("File uploaded successful!");
  } catch (error) {
    loggerError.error("Error while processing the uploaded file:", error);
    return res.status(500).json("File processing failed.");
  }
};

module.exports = { getNavbarItem, getRoot, getUser, uploadVolume };
