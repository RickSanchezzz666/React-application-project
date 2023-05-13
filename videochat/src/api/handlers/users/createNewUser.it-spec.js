const { createNewUser } = require('./createNewUser')

describe('createNewuser', () => {
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
    it('should throw error 403 and send message', async () => {
        await createNewUser(req, res);

        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalled();
        expect(res.send).toBeCalledWith('Your access level is not enough')
    })
})
