const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    key: String,
    createdAt: Date,
    counts: Array,
    value: String

});

module.exports = mongoose.model('records', recordSchema);
