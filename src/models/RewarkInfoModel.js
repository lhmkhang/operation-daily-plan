const mongoose = require('mongoose');

const rewardInfoSchema = new mongoose.Schema({
    user: String,
    fullName: String,
    lineManager: String,
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
