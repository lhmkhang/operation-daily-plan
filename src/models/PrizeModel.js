const mongoose = require('mongoose');

/* const prizeSchema = new mongoose.Schema({
    name: String,
    prize: String,
    quantity: Number
}); */

const prizeItemSchema = new mongoose.Schema({
    name: String, // Tên của giải thưởng
    prize: String, // Giá trị của giải thưởng
    quantity: Number // Số lượng còn lại của giải thưởng
});

const prizeSchema = new mongoose.Schema({
    team_name: String,
    prizes: [prizeItemSchema]
});

const Prize = mongoose.model('Prize', prizeSchema);

module.exports = Prize;
