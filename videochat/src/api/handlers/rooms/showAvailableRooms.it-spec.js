const { showAvailableRooms } = require('./showAvailableRooms')
const { RoomsModel } = require('../../../models/rooms');
const mongoose = require('mongoose')

describe('showAvailableRooms', () => {
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
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }
        it('and show all rooms and return status 200 and send meetings', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                }
            }

            await RoomsModel.insertMany([
                {
                    roomId: 'UcTudU',
                    password: 'VskCh',
                    startTime: '2023-05-11T14:23:00.000Z',
                    createdBy: 'Roman Lapiyk'
                },
                {
                    roomId: 'JduFks',
                    password: 'Fyprs',
                    startTime: '2023-05-15T14:23:00.000Z',
                    createdBy: 'Roman Lapiyk'
                }
            ])

            await showAvailableRooms(req, res);

            const meetings = res.send.mock.calls[0][0]

            expect(meetings).not.toBeNull();
            expect(meetings.every(el => el.createdBy === 'Roman Lapiyk')).toBe(true)
            expect(meetings[0].roomId).toBe('UcTudU');
            expect(meetings[1].roomId).toBe('JduFks');
            expect(meetings[0].password).toBe('VskCh');
            expect(meetings[1].password).toBe('Fyprs');
            expect(meetings[0].startTime).toEqual(new Date('2023-05-11T14:23:00.000Z'));
            expect(meetings[1].startTime).toEqual(new Date('2023-05-15T14:23:00.000Z'));

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith(meetings);
        })
    })
})