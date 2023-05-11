const { deleteRoom } = require('./deleteRoom')

describe('deleteRoom', () => {
    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }
        it('and throw error 403 and send message', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 20
                    }
                }
            }

            await deleteRoom(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(403);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith('Your access level is not enough')
        })
        it('and throw error 400 and send', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                body: {
                    grey: 'five nine'
                }
            }

            await deleteRoom(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toBeCalled();
        })
    })

})