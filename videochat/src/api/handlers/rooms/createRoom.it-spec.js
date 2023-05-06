const { createRoom } = require('./createRoom')
const { RoomsModel } = require('../../../models/rooms');
const mongoose = require('mongoose');

describe('createRoom', () => {
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
                roomId: 'AbCde',
                password: 'AbCde',
                startTime: '2023-05-05T15:52:00.000+00:00',
                createdBy: 'Maksym Pasternak'
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

        const roomId = req.body.roomId;
        const password = req.body.password;
        const startTime = req.body.startTime;
        const createdBy = req.body.createdBy;

        await createRoom(req, res);

        const room = new RoomsModel({ roomId, password, startTime, createdBy })

        await room.save();

        expect(room).not.toBeNull();
        expect(room.save).toBeCalled()
        expect(room.roomId).toBe('AbCde');
        expect(room.password).toBe('AbCde');
        expect(room.startTime).toBe('2023-05-05T15:52:00.000+00:00');
        expect(room.createdBy).toBe('Maksym Pasternak');

        it('and return status 200 and send', async () => {
            await createRoom(req, res);
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

        const handler = createRoom(mock);

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

        const handler = createRoom(mock);

        await handler(req, res);

        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalled();
        expect(res.send).toBeCalledWith('Your access level is not enough');
    });
});