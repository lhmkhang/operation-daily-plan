const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    name: String,
    route: String,
    roleId: mongoose.Schema.Types.ObjectId
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'modifiedDate'
    }
});

const App = mongoose.model('app', appSchema);

module.exports = App;
