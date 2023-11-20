const dotenv = require("dotenv").config();
const logger = require("../helpers/logger");
const loggerInfo = logger.getLogger("infoLogger");
const JWTService = require("./JWTServices");
const { StatusCodes } = require("http-status-codes");
const handleMessage = require("../utils/HandleMessage");
const MESSAGE = require("../utils/message");
const Prize = require("../models/PrizeModel");
const RewardInfo = require("../models/RewarkInfoModel");


const quantityChecker = async (req, res, next) => {
  try {
    const prizeName = req.body.prizeName;

    // console.log(prizeName);

    const data = await Prize.findOne({ name: prizeName });

    // console.log(data);

    // Tìm và cập nhật số lượng phần thưởng
    const result = await Prize.findOneAndUpdate(
      { name: prizeName, quantity: { $gt: 0 } }, // Điều kiện: phần thưởng còn số lượng
      { $inc: { quantity: -1 } }, // Hành động: giảm số lượng đi 1
      { new: true } // Trả về document sau khi cập nhật
    );


    if (result) {

      let { user,
        fullName,
        lineManager,
        location,
        prize } = req.body


      const rewardInfo = await RewardInfo.create({ user, fullName, lineManager, location, prize });

      res.json({ message: 'Chúc mừng! Bạn đã trúng phần thưởng.', status: "success" });
    } else {
      res.json({ message: 'Rất tiếc, phần thưởng này đã hết.' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình xử lý.' });
  }

  /* try {
    // Username or password is empty
    if (!username || !password)
      return next(
        new handleMessage(
          MESSAGE.AUTH.LOGIN.EMPTY_CREDENTIALS,
          StatusCodes.BAD_REQUEST
        )
      );

    // User does not exist in database
    const foundUser = await UserModel.findOne({ username: username });
    if (!foundUser)
      return next(
        new handleMessage(
          MESSAGE.AUTH.LOGIN.USER_NOT_FOUND,
          StatusCodes.UNAUTHORIZED
        )
      );

    const match = bcryptServices.comparePassword(password, foundUser.password);

    // Password is not match in the database
    if (!match)
      return next(
        new handleMessage(
          MESSAGE.AUTH.LOGIN.INVALID_CREDENTIALS,
          StatusCodes.UNAUTHORIZED
        )
      );

    loggerInfo.info("Login successful");

    const userId = foundUser._id.toString();
    const userRoleData = await UserRoleModel.findOne({
      userId: { $in: [userId] },
    });
    const roles = { [userRoleData.role]: userRoleData.functional };

    // Create AT: username + user role + Id, RF: username, store RF in the database
    const accessToken = JWTService.createToken({
      UserInfo: { userId, username, roles },
    });

    const refreshToken = JWTService.createToken({ userId, username });
    await UserModel.findByIdAndUpdate(userId, { refreshToken: refreshToken });
    return res.json({ accessToken, refreshToken });


  } catch (err) {
    next(err);
  } */
};

const getPrizes = async (req, res, next) => {
  try {
    const result = await (await Prize.find({})).map(i => { return { name: i.name, quantity: i.quantity } });
    return res.json({ data: result, status: 200 });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  quantityChecker, getPrizes
};
