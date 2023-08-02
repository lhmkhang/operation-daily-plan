const fileValidator = (fileType, data) => {
  let log = [];

  if (fileType === "1") {
  }
  if (data.length > 0) {
    let header = Object.keys(data[0])

    if (header.length !== 17) {
      log.push({ type: "header", message: `header không đủ độ dài 17 so với ${header.length}` })
    } else {
      const isNumber = data.some(obj => {
        let columnNumber = Object.keys(obj).slice(10);

        return columnNumber.some(key => {
          let regex = /^[0-9]+$/;
          // console.log(!regex.test(obj[key].toString()));
          return !regex.test(obj[key].toString());
        })
      })
      if (isNumber) {
        log.push({ type: "forecast", message: "Column Forecast chứa dữ liệu không phải là số" })
      };
    }
  }
  return log;
};

module.exports = fileValidator;
