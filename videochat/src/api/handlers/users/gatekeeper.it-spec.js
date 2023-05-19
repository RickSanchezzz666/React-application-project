const { gatekeeper } = require('./gatekeeper')
const { Users } = require('../../../models/users');
const mongoose = require('mongoose');

describe('gatekeeper', () => {
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
                    login: 'user1',
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

    afterAll(async () => {
        await Users.deleteMany();
    })

    describe('should be opened', () => {
        const res = {
            json: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }
        const req = {
            user: {
                user_info: {
                    name: 'Roman',
                    surname: 'Lapiyk',
                    profile_pic: 'https://i.ibb.co/HFbBrvn/Icon-profile.png',
                    access_level: 30
                }
            }
        }

        const name = req.user.user_info.name;
        const surname = req.user.user_info.surname;
        const profile_pic = req.user.user_info.profile_pic;
        const access_level = req.user.user_info.access_level;

        it('and return 200 and json the object', async () => {
            await gatekeeper(req, res);

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalled();
            expect(res.json).toBeCalledWith({ name, surname, profile_pic, access_level })
        })
    })
})