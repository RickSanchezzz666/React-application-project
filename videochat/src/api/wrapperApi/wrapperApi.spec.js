const { wrapperApi } = require('./wrapperApi')

describe("wrapperApi", () => {
    describe("should be success", () => {

        it('to be called', async () => {
            const mock = jest.fn().mockImplementation(async () => { });
            const handler = wrapperApi(mock);

            await handler();

            expect(mock).toBeCalled();
        })
    })
})