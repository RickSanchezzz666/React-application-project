const { showAvailableRooms } = require('./showAvailableRooms')


const RoomsModelMock = {};
jest.mock('../../../models/rooms', () => {
    RoomsModelMock.save = jest.fn();
    return {
        RoomsModelMock: jest.fn().mockImplementation(() => ({
            save: RoomsModelMock.save
        }))
    }
})

describe('showAvailableRooms', () => {
    it('should throw error 403 and send message', async () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }
        const req = {
            user: {
                user_info: {
                    access_level: 20
                }
            }
        }
    })
    it('should throw error 403 and send message', async () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        const req = {
            user: {
                user_info: {
                    access_level: 30
                }
            }
        }

        await showAvailableRooms(req, res);

        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalled();
        expect(res.send).toBeCalledWith('Your access level is not enough');
    })
    it('and should throw error 400 and send', async () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        const req = {
            user: {
                user_info: {
                    access_level: 30
                }
            }
        }

        const err = new Error();

        RoomsModelMock.save
            .mockImplementationOnce(() => { throw err })
        showAvailableRooms(req, res);

        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(400);
        expect(res.send).toBeCalled()
    })
})