const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var schema = new Schema({
    msg: { type: String},
    to: { type: String},
    from: {type: String},
    time: {type: String}
});
module.exports = mongoose.model('Messages', schema);