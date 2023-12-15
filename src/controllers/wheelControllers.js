const wheelServices = require("../services/wheelService");

const checkPrizeQuantity = async (req, res, next) => {
  wheelServices.quantityChecker(req, res, next);
};

const getListPrize = async (req, res, next) => {
  wheelServices.getPrizes(req, res, next);
}

const getTotalTurn = async (req, res, next) => {
  wheelServices.getTurn(req, res, next);
}

const getListUser = async (req, res, next) => {
  wheelServices.getUsers(req, res, next);
}

const getListRewardInfo = async (req, res, next) => {
  wheelServices.getListRewards(req, res, next);
}

module.exports = { checkPrizeQuantity, getListPrize, getTotalTurn, getListUser, getListRewardInfo };
