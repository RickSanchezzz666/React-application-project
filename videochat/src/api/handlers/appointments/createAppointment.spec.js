const { createAppointment } = require('./createAppointment')


const AppointmentsModelMock = {};
jest.mock('../../../models/appointments', () => {
    AppointmentsModelMock.save = jest.fn();
    return {
        AppointmentsModel: jest.fn().mockImplementation(() => ({
            save: AppointmentsModelMock.save
        }))
    }
})

describe('createAppointment', () => {


    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        it('should throw error and return status 400 and send', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                body: {
                    createdBy: 'Roman Lapiyk',
                    forUserId: '643666caf929797862b72f1e',
                    forUserName: 'Maksim Kagadiy',
                    appointmentTime: '2023-05-05T15:52:00.000Z'
                },
            };

            const err = new Error();

            AppointmentsModelMock.save
                .mockImplementationOnce(() => { throw err })
            createAppointment(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toBeCalled();
        });

        it('should throw error and return status 403 and send', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 20
                    }
                }
            };

            await createAppointment(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(403);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith('Your access level is not enough');
        });
    })
});