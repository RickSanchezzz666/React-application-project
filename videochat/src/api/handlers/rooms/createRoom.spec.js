const { createRoom } = require('./createRoom')

describe('createRoom', () => {
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

            await createRoom(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(403);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith('Your access level is not enough')
        })
    })

})