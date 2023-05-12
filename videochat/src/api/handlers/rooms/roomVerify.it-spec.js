const { roomVerify } = require('./roomVerify')
const { RoomsModel } = require('../../../models/rooms');
const mongoose = require('mongoose')

describe('roomVerify', () => {
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

        describe('should send request', () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                query: {
                    roomId: 'UcTudU'
                }
            }

            it('and verify the password', async () => {
                const roomId = req.query.roomId;

                await roomVerify(req, res);

                const room_ident = await RoomsModel.findOne({ roomId });

                expect(room_ident).not.toBeNull();
                expect(room_ident.roomId).toBe('UcTudU');
                expect(room_ident.password).toBe('VskCh');
            });

            it('and return 200 and send', async () => {
                await roomVerify(req, res);

                expect(res.status).toBeCalled();
                expect(res.status).toBeCalledWith(200);
                expect(res.send).toBeCalled();
            });

        })

        describe('and send request with an error', () => {
            it('and should throw error 400 and send message with/no roomId', async () => {
                const req = {
                    user: {
                        user_info: {
                            access_level: 30
                        }
                    },
                    query: {
                        grey: 'five nine'
                    }
                }
                await roomVerify(req, res)

                expect(res.status).toBeCalled();
                expect(res.status).toBeCalledWith(400);
                expect(res.send).toBeCalled();
                expect(res.send).toBeCalledWith({ message: 'Parameter roomId is required' })
            })
            it('and should throw error 400 and send message with/no found room', async () => {
                const req = {
                    user: {
                        user_info: {
                            access_level: 30
                        }
                    },
                    query: {
                        roomId: 'grey'
                    }
                }
                await roomVerify(req, res)

                expect(res.status).toBeCalled();
                expect(res.status).toBeCalledWith(400);
                expect(res.send).toBeCalled();
            })
        })
    });
});