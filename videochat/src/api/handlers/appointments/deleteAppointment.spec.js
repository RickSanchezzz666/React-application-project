const { deleteAppointment } = require('./deleteAppointment');

const AppointmentsModelMock = {};
jest.mock('../../../models/appointments', () => {
    AppointmentsModelMock.save = jest.fn();
    return {
        AppointmentsModel: jest.fn().mockImplementation(() => ({
            save: AppointmentsModelMock.save
        }))
    }
})


describe('deleteAppointment', () => {

    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        };

        it('and throw error 403 and send message', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 20
                    }
                },
            }

            await deleteAppointment(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(403);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith('Your access level is not enough');
        })

        it('and throw error 400 and send message', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                body: {
                    _id: null
                }
            }

            await deleteAppointment(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith({ message: 'AppointmentId is required!' });
        });

        it('and throw error 400 and send', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                body: {
                    _id: 'id'
                }
            }

            await deleteAppointment(req, res)

            expect(req.body._id).not.toBe(null);
            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toBeCalled();
        })


    });
});