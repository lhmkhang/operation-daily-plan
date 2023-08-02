const jwt = require("jsonwebtoken");
const XLSX = require("xlsx");
const fs = require("fs");
const logger = require("../helpers/logger");
const loggerError = logger.getLogger("errorLogger");
const loggerInfo = logger.getLogger("infoLogger");
const { generateNextWeekDays } = require("../helpers/processDate");
const uploadModel = require("../schemas/uploadSchema");
const logsUploadModel = require("../schemas/logsUploadSchema");
const dailyPlanModel = require("../schemas/dailyPlanSchema");
const fileValidator = require("../helpers/dataValidator");

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
        .sheet_to_json(worksheet, { header: 0, defval: "" })
        .map((object) => {
          delete object.__EMPTY;
          return object;
        });

      // console.log(jsonData);

      if (jsonData.length > 0) {
        try {
          let validationData = fileValidator("1", jsonData);

          if (validationData.length !== 0) {
            return res.status(400).json(validationData[0]);
          } else {

            const forecastKeys = Object.keys(jsonData[0]).filter((key) =>
              key.toLowerCase().includes("forecast")
            );

            const array_date = generateNextWeekDays(new Date());

            const newData = jsonData.map((object) => {
              const forecastValues = forecastKeys.map((key) => object[key]);
              const plan = {};

              for (const key in object) {
                if (!forecastKeys.includes(key)) {
                  plan[key] = object[key];
                }
              }

              const planData = {};

              array_date.forEach((date, index) => {
                const date_str = date.toISOString().split("T")[0]
                planData[date_str] = { Forecast: forecastValues[index], Plan: forecastValues[index], Real: "" };
              });

              plan.Plan = planData;
              return plan;
            });


            // console.log(JSON.stringify(newData));

            /* const transformDataUpload = jsonData.map((item) => {
              const Plan = {};
              const newData = {};
  
              for (const key in item) {
                if (item.hasOwnProperty(key)) {
                  const dateOrWeek = key.match(/\d{4}-\d{2}-\d{2}|Week \d+/);
                  if (dateOrWeek) {
                    const dataType = key.split(" ")[0];
                    Plan[dateOrWeek[0]] = {
                      ...(Plan[dateOrWeek[0]] || {}),
                      [dataType]: item[key],
                    };
                  } else {
                    newData[key] = item[key];
                  }
                }
              }
  
              return { ...newData, Plan };
            }); */

            await uploadModel.insertMany(newData, {
              ordered: false,
            });

            /* const dataInsertDailyPlan = transformDataUpload.map((object) => ({
              ...object,
              Plan: Object.keys(object.Plan).reduce((acc, nest_key) => {
                if (!nest_key.toLowerCase().includes("week")) {
                  acc[nest_key] = Object.keys(object.Plan[nest_key]).reduce(
                    (innerAcc, _key) => {
                      if (_key.toLowerCase() !== "forecast") {
                        innerAcc[_key] = "";
                      } else {
                        innerAcc[_key] = object.Plan[nest_key][_key];
                      }
                      return innerAcc;
                    },
                    {}
                  );
                } else {
                  acc[nest_key] = object.Plan[nest_key];
                }
                return acc;
              }, {}),
            })); */

            await dailyPlanModel.insertMany(newData);

            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            const username = jwt.decode(token, process.env.SECRET_KEY).username;

            const headerFileUpload = Object.keys(jsonData[0]);

            const logs = {
              file_header: headerFileUpload,
              function: "upload weekly plan",
              user_upload: username,
              project_list: jsonData.map((object) => {
                return object["Project name as PIM"];
              }),
              isSuccess: true,
            };

            await logsUploadModel.create(logs);
            return res.json("File uploaded successful!");
          }

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

module.exports = { uploadVolume };
