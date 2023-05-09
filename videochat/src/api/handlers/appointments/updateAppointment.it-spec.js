const { updateAppointment } = require('./updateAppointment')
const { AppointmentsModel } = require('../../../models/appointments');
const mongoose = require('mongoose');

describe('updateAppointment', () => {
    let appointmentId;
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            auth: {
                username: process.env.MONGO_DB_LOGIN,
                password: process.env.MONGO_DB_PASS
            }
        });
        console.log('mongoose was connected');

        const docs = await AppointmentsModel.insertMany([
            {
                _id: '64591194202dd9e29c102a76',
                createdBy: "Roman Lapiyk",
                forUserId: "643666caf929797862b72f1e",
                forUserName: "Maksim Kagadiy",
                appointmentTime: "2023-05-19T15:13:00.000Z",
                roomId: null,
                roomPass: null
            }
        ])
        appointmentId = docs._id;
    })
    describe('should be opened', () => {
        const req = {
            body: {
                id: '64591194202dd9e29c102a76',
                roomId: '123',
                roomPass: '1234',
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

        it('and find and update', async () => {
            await updateAppointment(req, res)

            const updatedObject = await AppointmentsModel.findOne({ _id: req.body.id })

            expect(updatedObject).not.toBeNull();
            expect(updatedObject.createdBy).toBe('Roman Lapiyk');
            expect(updatedObject.forUserId).toBe('643666caf929797862b72f1e');
            expect(updatedObject.forUserName).toBe('Maksim Kagadiy');
            expect(updatedObject.appointmentTime).toEqual(new Date('2023-05-19T15:13:00.000Z'));
            expect(updatedObject.roomId).toEqual('123')
            expect(updatedObject.roomPass).toEqual('1234')
        })
        it('and return 200 and send', async () => {
            await updateAppointment(req, res)

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
        })
        it('and should throw error 404 and send message', async () => {
            const req = {
                body: {
                    _id: '64591194202dd9e29c102a76',
                    roomId: '123',
                    roomPass: '1234',
                },
                user: {
                    user_info: {
                        access_level: 30
                    }
                }
            }
            await updateAppointment(req,res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(404);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith('Object not found')
        })
    })
})