const { createRoom } = require('./createRoom')
const { RoomsModel } = require('../../../models/rooms');
const mongoose = require('mongoose');
const { v4: uuid } = require('uuid')

describe('createRoom', () => {
    let roomId = uuid();
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            auth: {
                username: process.env.MONGO_DB_LOGIN,
                password: process.env.MONGO_DB_PASS
            }
        });
        console.log('mongoose was connected');
    });

    afterAll(async () => {
        await RoomsModel.deleteMany();
    })

    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }


        it('and be saved in db and return status 200 and send roomId', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                body: {
                    roomId,
                    password: 'VskCh',
                    startTime: '2023-05-11T14:23:00.000Z',
                    createdBy: 'Roman Lapiyk'
                }
            }

            await createRoom(req, res);

            const room = await RoomsModel.findOne({roomId})

            expect(room).not.toBeNull();
            expect(room.roomId).toBe(roomId);
            expect(room.password).toBe('VskCh');
            expect(room.startTime).toEqual(new Date('2023-05-11T14:23:00.000Z'));
            expect(room.createdBy).toBe('Roman Lapiyk');

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith({ roomId });
        });
        it('and throw error 400 and send', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                body: {
                    roomId: null,
                    password: null,
                    startTime: '2023-05-11T14:23:00.000Z',
                    createdBy: 'Roman Lapiyk'
                }
            }

            await createRoom(req, res)


            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toBeCalled();
        })
    })
});