const { deleteRoom } = require('./deleteRoom');
const { RoomsModel } = require('../../../models/rooms');
const mongoose = require('mongoose');

describe('deleteRoom', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            auth: {
                username: process.env.MONGO_DB_LOGIN,
                password: process.env.MONGO_DB_PASS
            }
        });
        console.log('mongoose was connected');

        await RoomsModel.insertMany([
            {
                roomId: 'UcTudU',
                password: 'VskCh',
                startTime: '2023-05-11T14:23:00.000Z',
                createdBy: 'Roman Lapiyk'
            }
        ])
    });

    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        it('and room should be deleted', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                body: {
                    roomId: 'UcTudU'
                }
            }

            const roomId = req.body.roomId;

            await deleteRoom(req, res);

            const room = await RoomsModel.findOne({ roomId })

            expect(room).toBeNull();
            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
        })
        it('and throw error 404 and send message', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                body: {
                    roomId: 'UcTudU'
                }
            }

            await deleteRoom(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(404);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith({ message: 'We not found any room' });
        })
        it('and throw error 400 and send message', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                body: {
                    roomId: null
                }
            }

            await deleteRoom(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith({ message: 'RoomId and RoomPassword is required!' });
        })
    })
})