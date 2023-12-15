const mongoose = require('mongoose');

const rewardInfoSchema = new mongoose.Schema({
    player: String,
    userName: String,
    fullName: String,
    lineManager: String,
    group: String,
    teamName: String,
    location: String,
    prize: String
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'modifiedDate'
    }
});

const Prize = mongoose.model('reward_info', rewardInfoSchema);

module.exports = Prize;
