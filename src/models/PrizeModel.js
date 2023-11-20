const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
    name: String,
    quantity: Number
});

const Prize = mongoose.model('Prize', prizeSchema);

module.exports = Prize;
