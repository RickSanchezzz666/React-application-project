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


    describe('should be opened', () => {
        const req = {
            body: {
                createdBy: 'Roman Lapiyk',
                forUserId: '643666caf929797862b72f1e',
                forUserName: 'Maksim Kagadiy',
                appointmentTime: '2023-05-05T15:52:00.000Z'
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

        it('and saved in db and return status 200 and send', async () => {

            await createAppointment(req, res);

            const appointment = await AppointmentsModel.findOne(req.body)

            expect(appointment).not.toBeNull();
            expect(appointment.createdBy).toBe('Roman Lapiyk');
            expect(appointment.forUserId).toBe('643666caf929797862b72f1e');
            expect(appointment.forUserName).toBe('Maksim Kagadiy');
            expect(appointment.appointmentTime).toEqual(new Date('2023-05-05T15:52:00.000Z'));

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
        })

    });

});