const { updateAppointment } = require('./updateAppointment')

const AppointmentsModelMock = {};
jest.mock('../../../models/appointments', () => {
    AppointmentsModelMock.save = jest.fn();
    return {
        AppointmentsModel: jest.fn().mockImplementation(() => ({
            save: AppointmentsModelMock.save
        }))
    }
})

describe('updateAppointment', () => {
    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }
        it('and throw error 403 and send message', async () => {
            const req = {
                body: {
                    id: '64591194202dd9e29c102a76',
                    roomId: '123',
                    roomPass: '1234',
                },
                user: {
                    user_info: {
                        access_level: 20
                    }
                }
            }

            await updateAppointment(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(403);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith('Your access level is not enough');
        })
        it('and throw error 500 and send message', async () => {
            const req = {
                body: {
                    id: '64591194202dd9e29c102a76',
                    roomId: '123',
                    roomPass: '1234',
                },
                user: {
                    user_info: {
                        access_level: 30
                    }
                }
            }

            const err = new Error();

            AppointmentsModelMock.save
                .mockImplementationOnce(() => { throw err })
            updateAppointment(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith('Internal server error');
        })
    })
})