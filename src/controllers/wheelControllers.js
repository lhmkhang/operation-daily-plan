const wheelServices = require("../services/wheelService");

const checkPrizeQuantity = async (req, res, next) => {
  wheelServices.quantityChecker(req, res, next);
};

const getListPrize = async (req, res, next) => {
  wheelServices.getPrizes(req, res, next);
}

module.exports = { checkPrizeQuantity, getListPrize };
