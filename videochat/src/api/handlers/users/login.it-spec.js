const { login } = require('./login')
const { Users } = require('../../../models/users');
const mongoose = require('mongoose')

describe('login', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            auth: {
                username: process.env.MONGO_DB_LOGIN,
                password: process.env.MONGO_DB_PASS
            }
        });
        console.log('mongoose was connected');

        await Users.insertMany([
            {
                user_info: {
                    email: 'testmail@gmail.com',
                    phone: '+380000000000',
                    name: 'Roman',
                    surname: 'Lapiyk',
                    login: 'doctor',
                    password: '123',
                    profile_pic: 'https://i.ibb.co/HFbBrvn/Icon-profile.png',
                    access_level: 30,
                    createdBy: 'Maksym Pasternak',
                    creationTime: '2023-04-11T07:37:18.457Z',
                    birthday: '2005-13-01',
                    gender: 'male'
                },
                location_info: {
                    address: 'st. Zamarstynivska, 83a',
                    city: 'Lviv',
                    country: 'Ukraine',
                    zipcode: '79000'
                },
                patient_info: {
                    overall: 'Secret user account',
                    blood_type: 'III+'
                }
            },
            {
                user_info: {
                    email: 'testsmail@gmail.com',
                    phone: '+380000000001',
                    name: 'Roman',
                    surname: 'Romanovich',
                    login: 'user',
                    password: '123',
                    profile_pic: 'https://i.ibb.co/HFbBrvn/Icon-profile.png',
                    access_level: 30,
                    createdBy: 'Maksym Pasternak',
                    creationTime: '2023-04-11T07:37:18.457Z',
                    birthday: '2023-04-06',
                    gender: 'male'
                },
                location_info: {
                    address: 'st. Zamarstynivska, 83a',
                    city: 'Lviv',
                    country: 'Ukraine',
                    zipcode: '79000'
                },
                patient_info: {
                    overall: 'Secret user account',
                    blood_type: 'III+'
                }
            }
        ])
    });
    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }
        const req = {
            body: {
                user_info: {
                    login: 'doctor',
                    password: '123'
                }
            }
        }
        it('and sign in user and return 200 and send token', async () => {
            await login(req, res)

            const token = res.send.mock.calls[0][0];

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith(token)
        })
    })
    describe('should be opened and throw error', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }
        it('400 and send message with/no login', async () => {
            const req = {
                body: {
                    user_info: {
                        password: '123'
                    }
                }
            }
            await login(req, res)

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith({
                message: 'Parameter login is required'
            })
        })
        it('400 and send message with/no password', async () => {
            const req = {
                body: {
                    user_info: {
                        login: 'doctor'
                    }
                }
            }
            await login(req, res)

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith({
                message: 'Parameter password is required'
            })
        })
        it('400 and send message with/no such user', async () => {
            const req = {
                body: {
                    user_info: {
                        login: 'doc',
                        password: '123'
                    }
                }
            }
            await login(req, res)

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith({
                message: 'We not found any user with combination'
            })
        })

        it('401 and send message with/no such user', async () => {
            const req = {
                body: {
                    user_info: {
                        login: 'doctor',
                        password: '1234'
                    }
                }
            }
            await login(req, res)

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(401);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith({
                message: 'Password is invalid'
            })
        })
    })
})