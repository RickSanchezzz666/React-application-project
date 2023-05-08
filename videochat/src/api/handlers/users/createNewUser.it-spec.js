const { createNewUser } = require('./createNewUser')
const { UsersModel } = require('../../../models/users');
const mongoose = require('mongoose');
const { use } = require('passport');

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


    it('should be saved in db', async () => {
        const req = {
            body: {
                user_info: {
                    email: 'testmail@gmail.com',
                    phone: '+380000000000',
                    name: 'User',
                    surname: 'Account',
                    login: 'user',
                    password: '123',
                    profile_pic: 'https://i.ibb.co/HFbBrvn/Icon-profile.png',
                    access_level: '20',
                    createdBy: 'Maksym Pasternak',
                    creationTime: '2023-04-11T07:37:18.457+00:00',
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
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        const email = req.body.user_info.email;
        const phone = req.body.user_info.phone;
        const name = req.body.user_info.name;
        const surname = req.body.user_info.surname;
        const login = req.body.user_info.login;
        const password = req.body.user_info.password;
        const profile_pic = req.body.user_info.profile_pic;
        const access_level = req.body.user_info.access_level;
        const createdBy = req.body.user_info.createdBy;
        const creationTime = req.body.user_info.creationTime;
        const birthday = req.body.user_info.birthday;
        const gender = req.body.user_info.gender;
        const address = req.body.location_info.address;
        const city = req.body.location_info.city;
        const country = req.body.location_info.country;
        const zipcode = req.body.location_info.zipcode;
        const overall = req.body.patient_info.overall;
        const blood_type = req.body.patient_info.blood_type;

        await createNewUser(req, res);

        const user = new UsersModel({ user_info: { email, phone, name, surname, login, password, profile_pic, access_level, createdBy, creationTime, birthday, gender }, location_info: { address, city, country, zipcode }, patient_info: { overall, blood_type } })

        await user.save();

        expect(user).not.toBeNull();
        expect(user.save).toBeCalled()
        expect(user.user_info.email).toBe('testmail@gmail.com');
        expect(user.user_info.phone).toBe('+380000000000');
        expect(user.user_info.name).toBe('User');
        expect(user.user_info.surname).toBe('Account');
        expect(user.user_info.login).toBe('user');
        expect(user.user_info.password).toBe('123');
        expect(user.user_info.profile_pic).toBe('https://i.ibb.co/HFbBrvn/Icon-profile.png');
        expect(user.user_info.access_level).toBe('20');
        expect(user.user_info.createdBy).toBe('Maksym Pasternak');
        expect(user.user_info.creationTime).toBe('2023-04-11T07:37:18.457+00:00');
        expect(user.user_info.birthday).toBe('2023-04-06');
        expect(user.user_info.gender).toBe('female');
        expect(user.location_info.address).toBe('st. Zamarstynivska, 83a');
        expect(user.location_info.city).toBe('Lviv');
        expect(user.location_info.country).toBe('Ukraine');
        expect(user.location_info.zipcode).toBe('79000');
        expect(user.patient_info.overall).toBe('Secret user account');
        expect(user.patient_info.blood_type).toBe('III+');


        it('and return status 200 and send', async () => {
            await createNewUser(req, res);
            expect(res.status).toBeCalled
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
        })

    });

    it('should throw error and return status 400 and send', async () => {
        const req = {
            user: {
                user_info: {
                    access_level: 30
                }
            }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        };

        const err = new Error;
        const mock = jest.fn().mockImplementation(async () => { throw err });

        const handler = createNewUser(mock);

        await handler(req, res);

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
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        };

        const err = new Error;
        const mock = jest.fn().mockImplementation(async () => { throw err });

        const handler = createNewUser(mock);

        await handler(req, res);

        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalled();
        expect(res.send).toBeCalledWith('Your access level is not enough');
    });
});