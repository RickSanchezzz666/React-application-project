const { wrapperApi } = require('./wrapperApi')

describe('wrapperApi', () => {
    describe('should be success', () => {
        const mock = jest.fn();
        const handler = wrapperApi(mock);
        const req = jest.fn();
        const res = jest.fn();

        it('and be called', async () => {
            await handler();

            expect(mock).toBeCalled();
        });
        it('and be called with req, res', async () => {
            await handler(req, res);

            expect(mock).toBeCalled();
            expect(mock).toBeCalledWith(req, res)
        })
    });
    describe('should throw an error', () => {

        const err = new Error();
        const mock = jest.fn().mockImplementation(async () => { throw err })
        const handler = wrapperApi(mock);
        const req = jest.fn();
        const res = {
            status: jest.fn().mockImplementation(() => res),
            send: jest.fn()
        };

        it('and return status 500', async () => {
            await handler(req, res);

            expect(res.status).toBeCalled()
            expect(res.status).toBeCalledWith(500)
        })
        it('and send Internal server error message', async () => {
            await handler(req, res);

            expect(res.send).toBeCalled()
            expect(res.send).toBeCalledWith({ message: `Internal server error:${err.toString()}` })
        })
    })
});