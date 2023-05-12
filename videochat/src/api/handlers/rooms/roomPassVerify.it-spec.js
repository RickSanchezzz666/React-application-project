const { roomPassVerify } = require('./roomPassVerify')
const { RoomsModel } = require('../../../models/rooms');
const mongoose = require('mongoose')

describe('roomPassVerify', () => {
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
                    roomId: 'UcTudU',
                    password: 'VskCh'
                }
            }

            it('and verify the password', async () => {
                const roomId = req.query.roomId;

                await roomPassVerify(req, res);

                const room_ident = await RoomsModel.findOne({ roomId });

                expect(room_ident).not.toBeNull();
                expect(room_ident.roomId).toBe('UcTudU');
                expect(room_ident.password).toBe('VskCh');
            });

            it('and return 200 and send', async () => {
                await roomPassVerify(req, res);

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
                        password: 'VskCh'
                    }
                }
                await roomPassVerify(req, res)

                expect(res.status).toBeCalled();
                expect(res.status).toBeCalledWith(400);
                expect(res.send).toBeCalled();
                expect(res.send).toBeCalledWith({ message: 'Parameter roomId is required' })
            })
            it('and should throw error 400 and send message with/no pass', async () => {
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
                await roomPassVerify(req, res)

                expect(res.status).toBeCalled();
                expect(res.status).toBeCalledWith(400);
                expect(res.send).toBeCalled();
                expect(res.send).toBeCalledWith({ message: 'Parameter password is required' })
            })
            it('and should throw error 400 and send message with/no found room', async () => {
                const req = {
                    user: {
                        user_info: {
                            access_level: 30
                        }
                    },
                    query: {
                        roomId: 'grey',
                        password: 'VskCh'
                    }
                }
                await roomPassVerify(req, res)

                expect(res.status).toBeCalled();
                expect(res.status).toBeCalledWith(400);
                expect(res.send).toBeCalled();
                expect(res.send).toBeCalledWith({ message: 'We not found any room with such room id' })
            })
            it('and should throw error 401 and send', async () => {
                const req = {
                    user: {
                        user_info: {
                            access_level: 30
                        }
                    },
                    query: {
                        roomId: 'UcTudU',
                        password: 'grey'
                    }
                }

                await roomPassVerify(req, res)

                expect(res.status).toBeCalled();
                expect(res.status).toBeCalledWith(401);
                expect(res.send).toBeCalled();
            })
        })
    });
});