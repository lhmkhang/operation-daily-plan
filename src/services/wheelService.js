const dotenv = require("dotenv").config();
const logger = require("../helpers/logger");
const loggerInfo = logger.getLogger("infoLogger");
const JWTService = require("./JWTServices");
const { StatusCodes } = require("http-status-codes");
const handleMessage = require("../utils/HandleMessage");
const MESSAGE = require("../utils/message");
const Prize = require("../models/PrizeModel");
const RewardInfo = require("../models/RewarkInfoModel");
const TurnWheel = require("../models/TurnWheelModel");
const luckyMoneyUser = require("../models/LuckyMoneyUserModel");

const quantityChecker = async (req, res, next) => {
  try {
    const { selectPrize, winnerUsername, user } = req.body;
    const prizeName = selectPrize === 1 ? '500.000 vnđ' : selectPrize === 2 ? '300.000 vnđ' : selectPrize === 3 ? '200.000 vnđ' : '100.000 vnđ'

    // Tìm và cập nhật số lượng phần thưởng
    const result = await Prize.findOneAndUpdate(
      { prize: prizeName, quantity: { $gt: 0 } }, // Điều kiện: phần thưởng còn số lượng
      { $inc: { quantity: -1 } }, // Hành động: giảm số lượng đi 1
      { new: true } // Trả về document sau khi cập nhật
    );

    if (result) {
      if (user === req.user) {
        const userSplit = winnerUsername.split(' - ')[0];
        const userInfo = await luckyMoneyUser.findOne({ Username: userSplit })

        if (!userInfo) {
          return next(new handleMessage('user not found!', StatusCodes.NOT_FOUND));
        }

        await RewardInfo.create({ player: user, userName: userInfo.Username, fullName: userInfo.Fullname, lineManager: userInfo.LeaderFullName, group: userInfo.Group, teamName: userInfo.TeamName, location: userInfo.Location, prize: prizeName });
        // await TurnWheel.findOneAndUpdate({ username: user }, { $inc: { quantity: -1 } })
        return res.json({ message: 'Chúc mừng! Bạn đã trúng phần thưởng.', status: "success" });
      } else {
        return res.json({ message: 'Username không hợp lệ', status: "fail" });
      }
    } else {
      return res.json({ message: 'Rất tiếc, phần thưởng này đã hết.' });
    }
  } catch (error) {
    next(error);
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
    const result = await (await Prize.find({})).map(i => { return { name: i.name, quantity: i.quantity, prize: i.prize } });
    return res.json({ data: result, status: 200 });
  } catch (error) {
    next(error);
  }
}

const getTurn = async (req, res, next) => {
  const userName = req.body.username;
  try {
    const data = await TurnWheel.findOne({ username: userName });

    return res.json({ username: userName, quantity: data.quantity });
  } catch (error) {
    next(error);
  }
}

const getUsers = async (req, res, next) => {
  try {
    const result = await luckyMoneyUser.find({}, { "Username": 1, "Fullname": 1, "_id": 0 });
    const transformedData = result.map(item => `${item.Username} - ${item.Fullname}`);
    return res.json({ data: transformedData, status: 200 })
  } catch (error) {
    next(error);
  }
}

const getListRewards = async (req, res, next) => {
  const { user } = req.body;
  try {
    const data = await RewardInfo.find({});
    const result = data.map(i => {
      return {
        username: i.userName,
        name: i.fullName,
        manager: i.lineManager,
        prize: { name: "", prize: i.prize }
      }
    })
    return res.json({ data: result, status: 200 });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  quantityChecker, getPrizes, getTurn, getUsers, getListRewards
};
