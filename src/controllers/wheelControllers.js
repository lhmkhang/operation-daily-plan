const wheelServices = require("../services/wheelService");

const checkPrizeQuantity = async (req, res, next) => {
  wheelServices.quantityChecker(req, res, next);
};

const checkPrizeQuantityV2 = async (req, res, next) => {
  wheelServices.quantityCheckerV2(req, res, next);
};

const getListPrize = async (req, res, next) => {
  wheelServices.getPrizes(req, res, next);
}

const getListPrizeV2 = async (req, res, next) => {
  wheelServices.getPrizesV2(req, res, next);
}

const getTotalTurn = async (req, res, next) => {
  wheelServices.getTurn(req, res, next);
}

const getListUser = async (req, res, next) => {
  wheelServices.getUsers(req, res, next);
}

const getListUserV2 = async (req, res, next) => {
  wheelServices.getUsersV2(req, res, next);
}
const getAllTeams = async (req, res, next) => {
  wheelServices.getTeam(req, res, next);
}

const getListRewardInfo = async (req, res, next) => {
  wheelServices.getListRewards(req, res, next);
}

module.exports = { checkPrizeQuantity, getListPrize, getTotalTurn, getListUser, getListRewardInfo, checkPrizeQuantityV2, getListPrizeV2, getListUserV2, getAllTeams };
