const { createAppointment } = require('./createAppointment')
const { AppointmentsModel } = require('../../../models/appointments');
const mongoose = require('mongoose');

describe('createAppointment', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            auth: {
                username: process.env.MONGO_DB_LOGIN,
                password: process.env.MONGO_DB_PASS
            }
        });
        console.log('mongoose was connected');
    });


    it('should be saved in db', async () => {
        const req = {
            body: {
                createdBy: 'Roman Lapiyk',
                forUserId: '643666caf929797862b72f1e',
                forUserName: 'Maksim Kagadiy',
                appointmentTime: '2023-05-05T15:52:00.000+00:00'
            },
            user: {
                user_info: {
                    access_level: 30
                }
            }
        }
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        const createdBy = req.body.createdBy;
        const forUserId = req.body.forUserId;
        const forUserName = req.body.forUserName;
        const appointmentTime = req.body.appointmentTime;

        await createAppointment(req, res);

        const appointment = new AppointmentsModel({ createdBy, forUserId, forUserName, appointmentTime })

        await appointment.save();

        expect(appointment).not.toBeNull();
        expect(appointment.save).toBeCalled()
        expect(appointment.createdBy).toBe('Roman Lapiyk');
        expect(appointment.forUserId).toBe('643666caf929797862b72f1e');
        expect(appointment.forUserName).toBe('Maksim Kagadiy');
        expect(appointment.appointmentTime).toBe('2023-05-05T15:52:00.000+00:00');

        it('and return status 200 and send', async () => {
            await createAppointment(req, res);
            expect(res.status).toBeCalled
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
        })

    });

    it('should throw error and return status 400 and send', async () => {
        const req = {
            user: {
                user_info: {
                    access_level: 30
                }
            }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        };

        const err = new Error;
        const mock = jest.fn().mockImplementation(async () => { throw err });

        const handler = createAppointment(mock);

        await handler(req, res);

        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(400);
        expect(res.send).toBeCalled();
    });

    it('should throw error and return status 403 and send', async () => {
        const req = {
            user: {
                user_info: {
                    access_level: 20
                }
            }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        };

        const err = new Error;
        const mock = jest.fn().mockImplementation(async () => { throw err });

        const handler = createAppointment(mock);

        await handler(req, res);

        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalled();
        expect(res.send).toBeCalledWith('Your access level is not enough');
    });
});