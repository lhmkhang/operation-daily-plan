const authorizationServices = require("../services/authorizationService");

const handleAuthorizationController = async (req, res, next) => {
    authorizationServices.getPermission(req, res, next);
};

module.exports = { handleAuthorizationController };
