const { getAppointment } = require('./getAppointments');
const { AppointmentsModel } = require('../../../models/appointments');
const mongoose = require('mongoose');

describe('getAppointment', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            auth: {
                username: process.env.MONGO_DB_LOGIN,
                password: process.env.MONGO_DB_PASS
            }
        });
        console.log('mongoose was connected');

        await AppointmentsModel.insertMany([
            {
                createdBy: "Roman Lapiyk",
                forUserId: "643666caf929797862b72f1e",
                forUserName: "Maksim Kagadiy",
                appointmentTime: "2023-05-19T15:13:00.000Z",
                roomId: null,
                roomPass: null
            },
            {
                createdBy: "Roman Lapiyk",
                forUserId: "643666caf929797862b72f1e",
                forUserName: "Maksim Kagadiy",
                appointmentTime: "2023-05-17T15:13:00.000Z",
                roomId: null,
                roomPass: null
            }
        ])
    });

    describe('should be opened with access level 20', () => {
        const req = {
            user: {
                user_info: {
                    access_level: 20
                },
                _id: "643666caf929797862b72f1e"
            }
        }
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        it('and find appointment', async () => {
            await getAppointment(req, res)

            const appointments = await AppointmentsModel.find({ forUserId: req.user._id });

            const appointment = appointments[0];

            expect(appointment).not.toBeNull();
            expect(appointment.createdBy).toBe('Roman Lapiyk');
            expect(appointment.forUserId).toBe('643666caf929797862b72f1e');
            expect(appointment.forUserName).toBe('Maksim Kagadiy');
            expect(appointment.appointmentTime).toEqual(new Date('2023-05-19T15:13:00.000Z'));

        })
        it('and sort by appointmentTime', async () => {
            await getAppointment(req, res)

            const appointments = await AppointmentsModel.find({ forUserId: req.user._id }).sort({ appointmentTime: 1 });

            expect(appointments).not.toBeNull();
            expect(appointments[0].createdBy).toBe('Roman Lapiyk');
            expect(appointments[1].createdBy).toBe('Roman Lapiyk');
            expect(appointments[0].forUserId).toBe('643666caf929797862b72f1e');
            expect(appointments[1].forUserId).toBe('643666caf929797862b72f1e');
            expect(appointments[0].forUserName).toBe('Maksim Kagadiy');
            expect(appointments[1].forUserName).toBe('Maksim Kagadiy');
            expect(appointments[0].appointmentTime).toEqual(new Date('2023-05-17T15:13:00.000Z'));
            expect(appointments[1].appointmentTime).toEqual(new Date('2023-05-19T15:13:00.000Z'));
        })
        it('and return status 200 and send appointments', async () => {
            await getAppointment(req, res)

            const appointments = await AppointmentsModel.find({ forUserId: req.user._id }).sort({ appointmentTime: 1 });

            expect(appointments).not.toBeNull();
            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith(appointments);
        })
    })

    describe('should be opened with access level 25 || 30', () => {
        const req = {
            user: {
                user_info: {
                    access_level: 30
                }
            },
            query: {
                forUserId: "643666caf929797862b72f1e"
            }
        }
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        const dbQuery = {};
        it('and find appointment', async () => {
            await getAppointment(req, res);

            const forUserId = req.query.forUserId;

            if (forUserId) {
                dbQuery.forUserId = forUserId;
            }

            const appointments = await AppointmentsModel.find(dbQuery);

            const appointment = appointments[0]

            expect(appointments).not.toBeNull()
            expect(appointment.createdBy).toBe('Roman Lapiyk');
            expect(appointment.forUserId).toBe('643666caf929797862b72f1e');
            expect(appointment.forUserName).toBe('Maksim Kagadiy');
            expect(appointment.appointmentTime).toEqual(new Date('2023-05-19T15:13:00.000Z'));

        })
        it('and sort by appointmentTime', async () => {
            await getAppointment(req, res)

            const forUserId = req.query.forUserId;

            if (forUserId) {
                dbQuery.forUserId = forUserId;
            }

            const appointments = await AppointmentsModel.find(dbQuery).sort({ appointmentTime: 1 });

            expect(appointments).not.toBeNull();
            expect(appointments[0].createdBy).toBe('Roman Lapiyk');
            expect(appointments[1].createdBy).toBe('Roman Lapiyk');
            expect(appointments[0].forUserId).toBe('643666caf929797862b72f1e');
            expect(appointments[1].forUserId).toBe('643666caf929797862b72f1e');
            expect(appointments[0].forUserName).toBe('Maksim Kagadiy');
            expect(appointments[1].forUserName).toBe('Maksim Kagadiy');
            expect(appointments[0].appointmentTime).toEqual(new Date('2023-05-17T15:13:00.000Z'));
            expect(appointments[1].appointmentTime).toEqual(new Date('2023-05-19T15:13:00.000Z'));
        })
        it('and return status 200 and send appointments', async () => {
            await getAppointment(req, res)

            const forUserId = req.query.forUserId;

            if (forUserId) {
                dbQuery.forUserId = forUserId;
            }

            const appointments = await AppointmentsModel.find(dbQuery).sort({ appointmentTime: 1 });

            expect(appointments).not.toBeNull();
            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith(appointments);
        })
    })

})