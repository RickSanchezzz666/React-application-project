const { Schema, model } = require('mongoose');

const schema = new Schema({
    createdBy: { type: String, required: true },
    forUser: { type: String, required: true },
    appointmentTime: { type: Date, required: true }
});

const AppointmentsModel = new model('appointments', schema)

module.exports = { AppointmentsModel };