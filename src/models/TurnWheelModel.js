const mongoose = require('mongoose');

const turnSchema = new mongoose.Schema({
    username: { type: String, require: true },
    quantity: Number
},
    {
        versionKey: false,
        timestamps: {
            createdAt: 'createdDate',
            updatedAt: 'modifiedDate'
        }
    }
);

const Turn = mongoose.model('turn-wheel', turnSchema);

module.exports = Turn;
