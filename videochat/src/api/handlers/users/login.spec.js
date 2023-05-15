const { login } = require('./login')

describe('login', () => {
    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        const err = new Error();

        const req = () => { throw err }

        it('and throw error 500 and send message', async () => {
            await login(req, res)

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith({
                message: 'Internal server error'
            })
        })
    })
})