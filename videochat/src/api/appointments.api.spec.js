const { Appointments } = require('./appointments.api');
const { AppointmentsModel } = require('../models/appointments');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('MongoDB was connected');
})

describe("appointmentsApi", () => {
    it("post /api/create-new-appointment", () => {
        const token = process.env.JWT_TOKEN
        it("should create and save in DB", async () => {
            it("")
        })
    })
})