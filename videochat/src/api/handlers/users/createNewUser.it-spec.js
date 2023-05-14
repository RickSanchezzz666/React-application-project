const { createNewUser } = require('./createNewUser')
const { Users } = require('../../../models/users');
const mongoose = require('mongoose');

describe('createNewUser', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            auth: {
                username: process.env.MONGO_DB_LOGIN,
                password: process.env.MONGO_DB_PASS
            }
        });
        console.log('mongoose was connected');
    });

    describe('should be opened', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        describe('with lvl 30', () => {
            it('and create user and return 200 and send', async () => {
                const req = {
                    body: {
                        user_info: {
                            email: 'testmail@gmail.com',
                            phone: '+380000000000',
                            name: 'Users',
                            surname: 'Accounts',
                            login: 'user',
                            password: '123',
                            profile_pic: 'https://i.ibb.co/HFbBrvn/Icon-profile.png',
                            access_level: 20,
                            createdBy: 'Maksym Pasternak',
                            creationTime: '2023-04-11T07:37:18.457Z',
                            birthday: '2023-04-06',
                            gender: 'female'
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
                    user: {
                        user_info: {
                            access_level: 30
                        }
                    }
                }

                const login = req.body.user_info.login;

                await createNewUser(req, res);

                const user = await Users.findOne({ login: login });


                expect(user).not.toBeNull();
                expect(user.user_info.email).toBe('testmail@gmail.com');
                expect(user.user_info.phone).toBe('+380000000000');
                expect(user.user_info.name).toBe('Users');
                expect(user.user_info.surname).toBe('Accounts');
                expect(user.user_info.login).toBe('user');
                expect(user.user_info.password).toBe('123');
                expect(user.user_info.profile_pic).toBe('https://i.ibb.co/HFbBrvn/Icon-profile.png');
                expect(user.user_info.access_level).toBe(20);
                expect(user.user_info.createdBy).toBe('Maksym Pasternak');
                expect(user.user_info.creationTime).toEqual(new Date('2023-04-11T07:37:18.457Z'));
                expect(user.user_info.birthday).toBe('2023-04-06');
                expect(user.user_info.gender).toBe('female');
                expect(user.location_info.address).toBe('st. Zamarstynivska, 83a');
                expect(user.location_info.city).toBe('Lviv');
                expect(user.location_info.country).toBe('Ukraine');
                expect(user.location_info.zipcode).toBe('79000');
                expect(user.patient_info.overall).toBe('Secret user account');
                expect(user.patient_info.blood_type).toBe('III+');
                expect(res.status).toBeCalled();
                expect(res.status).toBeCalledWith(200);
                expect(res.send).toBeCalled();
            });

            it('should throw error 500 and send message', async () => {
                const req = {
                    body: { grey: 'five nine' },
                    user: {
                        user_info: {
                            access_level: 30
                        }
                    }
                }

                await createNewUser(req, res);

                expect(res.status).toBeCalled();
                expect(res.status).toBeCalledWith(500);
                expect(res.send).toBeCalled();
                expect(res.send).toBeCalledWith({ message: 'Internal server error' })
            })
        })

        describe('with lvl 25', () => {
            it('and create user and return 200 and send', async () => {
                const req = {
                    body: {
                        user_info: {
                            email: 'testmail@gmail.com',
                            phone: '+380000000000',
                            name: 'Users',
                            surname: 'Accounts',
                            login: 'users',
                            password: '123',
                            profile_pic: 'https://i.ibb.co/HFbBrvn/Icon-profile.png',
                            createdBy: 'Maksym Pasternak',
                            creationTime: '2023-04-11T07:37:18.457Z',
                            birthday: '2023-04-06',
                            gender: 'female'
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
                    user: {
                        user_info: {
                            access_level: 25
                        }
                    }
                }

                const login = req.body.user_info.login;

                await createNewUser(req, res);

                const user = await Users.findOne({ login: login });

                expect(user).not.toBeNull();
                expect(user.user_info.email).toBe('testmail@gmail.com');
                expect(user.user_info.phone).toBe('+380000000000');
                expect(user.user_info.name).toBe('Users');
                expect(user.user_info.surname).toBe('Accounts');
                expect(user.user_info.login).toBe('user');
                expect(user.user_info.password).toBe('123');
                expect(user.user_info.profile_pic).toBe('https://i.ibb.co/HFbBrvn/Icon-profile.png');
                expect(user.user_info.createdBy).toBe('Maksym Pasternak');
                expect(user.user_info.creationTime).toEqual(new Date('2023-04-11T07:37:18.457Z'));
                expect(user.user_info.birthday).toBe('2023-04-06');
                expect(user.user_info.gender).toBe('female');
                expect(user.location_info.address).toBe('st. Zamarstynivska, 83a');
                expect(user.location_info.city).toBe('Lviv');
                expect(user.location_info.country).toBe('Ukraine');
                expect(user.location_info.zipcode).toBe('79000');
                expect(user.patient_info.overall).toBe('Secret user account');
                expect(user.patient_info.blood_type).toBe('III+');

                expect(res.status).toBeCalled();
                expect(res.status).toBeCalledWith(200);
                expect(res.send).toBeCalled();
            });

            it('should throw error 500 and send message', async () => {
                const req = {
                    body: { grey: 'five nine' },
                    user: {
                        user_info: {
                            access_level: 25
                        }
                    }
                }

                await createNewUser(req, res);

                expect(res.status).toBeCalled();
                expect(res.status).toBeCalledWith(500);
                expect(res.send).toBeCalled();
                expect(res.send).toBeCalledWith({ message: 'Internal server error' })
            })
        })
    });
});