const { getAppointment } = require('./getAppointments');

const AppointmentsModelMock = {};
jest.mock('../../../models/appointments', () => {
    AppointmentsModelMock.save = jest.fn();
    return {
        AppointmentsModel: jest.fn().mockImplementation(() => ({
            save: AppointmentsModelMock.save
        }))
    }
})

describe('getAppointment', () => {
    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        it('and throw error 400 with 20 access level', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 20
                    }
                }
            }

            const err = new Error();

            AppointmentsModelMock.save
                .mockImplementationOnce(() => { throw err })
            getAppointment(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toBeCalled();
        })
        it('and throw error 400 with 25 || 30 access level', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                }
            }

            const err = new Error();

            AppointmentsModelMock.save
                .mockImplementationOnce(() => { throw err })
            getAppointment(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toBeCalled();
        })
    })
})