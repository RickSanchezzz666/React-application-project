const { getUsers } = require('./getUsers')

describe('getUsers', () => {
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

    it('should be opened and throw error 403 and send message', async () => {
        await getUsers(req, res);

        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalled();
        expect(res.send).toBeCalledWith('Your access level is not enough')
    })
})