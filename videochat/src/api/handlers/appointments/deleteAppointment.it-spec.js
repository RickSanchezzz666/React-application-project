const { deleteAppointment } = require('./deleteAppointment');
const { AppointmentsModel } = require('../../../models/appointments');
const mongoose = require('mongoose');

describe('deleteAppointment', () => {
    let appointmentId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            auth: {
                username: process.env.MONGO_DB_LOGIN,
                password: process.env.MONGO_DB_PASS
            }
        });
        console.log('mongoose was connected');

        const appointment = new AppointmentsModel({
            createdBy: 'Roman Lapiyk',
            forUserId: '643666caf929797862b72f1e',
            forUserName: 'Maksim Kagadiy',
            appointmentTime: '2023-05-05T15:52:00.000Z'
        })
        const doc = await appointment.save();
        appointmentId = doc._id;
    });

    describe('should be opened', () => {
        it('and deleted from db and return 200 and send', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                body: {
                    _id: appointmentId
                }
            }

            const res = {
                send: jest.fn(),
                status: jest.fn().mockImplementation(() => res)
            };

            await deleteAppointment(req, res);

            const appointmentExist = await AppointmentsModel.findOne({ _id: appointmentId });

            expect(appointmentExist).toBe(null)
            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
        })

        it('should throw error and return 404 and send message', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                body: {
                    _id: appointmentId
                }
            }

            const res = {
                send: jest.fn(),
                status: jest.fn().mockImplementation(() => res)
            };

            await deleteAppointment(req, res);

            const appointmentExist = await AppointmentsModel.findOne({ _id: appointmentId });

            expect(appointmentExist).toBe(null);
            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(404);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith({ message: 'We dont found such appointment!' })
        })

    });
});