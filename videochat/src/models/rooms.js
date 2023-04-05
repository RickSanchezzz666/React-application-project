const { Schema, model } = require('mongoose');

const schema = new Schema({
    roomId: { type: String, required: true },
    password: { type: String },
    startTime: { type: Date }
});

const RoomsModel = new model('meetings', schema)

module.exports = { RoomsModel };