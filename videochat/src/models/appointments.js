const { Schema, model } = require('mongoose');

const schema = new Schema({
    createdBy: { type: String, required: true },
    forUserId: { type: String, required: true },
    forUserName: { type: String, required: true },
    appointmentTime: { type: Date, required: true },
    roomId: { type: String, default: null },
    roomPass: { type: String, default: null }
});

const AppointmentsModel = new model('appointments', schema)

module.exports = { AppointmentsModel };