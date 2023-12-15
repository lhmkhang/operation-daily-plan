const mongoose = require('mongoose');

const luckyMoneyUserSchema = new mongoose.Schema({
    Username: String,
    Fullname: String,
    LeaderFullName: String,
    Group: String,
    TeamName: String,
    Location: String
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'modifiedDate'
    }
});

const luckyMoneyUser = mongoose.model('lucky_money_user', luckyMoneyUserSchema);

module.exports = luckyMoneyUser;
