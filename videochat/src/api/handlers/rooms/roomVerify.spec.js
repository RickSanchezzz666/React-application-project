const { roomVerify } = require('./roomVerify')

describe('roomVerify', () => {
    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }
        const req = () => { throw new Error() };
        it('and throw error 500 and send', async () => {
            await roomVerify(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toBeCalled();
        })
    })
})