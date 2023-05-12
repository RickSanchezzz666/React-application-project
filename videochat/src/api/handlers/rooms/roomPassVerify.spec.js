const { roomPassVerify } = require('./roomPassVerify')

describe('roomPassVerify', () => {
    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }
        const req = () => { throw new Error() };
        it('and throw error 500 and send', async () => {
            await roomPassVerify(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toBeCalled();
        })
    })
})