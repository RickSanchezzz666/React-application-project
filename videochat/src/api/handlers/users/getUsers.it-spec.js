const { getUsers } = require('./getUsers')
const { Users } = require('../../../models/users');
const mongoose = require('mongoose');
const { use } = require('passport');

describe('getUsers', () => {
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
            },
            {
                user_info: {
                    email: 'testmail@gmail.com',
                    phone: '+380000000000',
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
    describe('should be opened with lvl 30', () => {
        const res = {
            send: jest.fn(),
            status: jest.fn().mockImplementation(() => res)
        }

        it('and return 200 and send users', async () => {
            const req = {
                user: {
                    user_info: {
                        access_level: 30
                    }
                },
                query: {
                    name: 'Roman',
                    // email: 'testmail@gmail.com',
                    // phone: '+380000000000',
                    // name: 'Roman',
                    // surname: 'Lapiyk',
                    // gender: 'male',
                    // access_level: 30,
                    // createdBy: 'Maksym Pasternak',
                    // creationTime: '2023-04-11T07:37:18.457Z',
                    // birthday: '2023-04-06',
                    // address: 'st. Zamarstynivska, 83a',
                    // city: 'Lviv',
                    // country: 'Ukraine',
                    // zipcode: '79000',
                    // blood_type: 'III+'
                }
            }
            
            await getUsers(req, res);

            const users = res.send.mock.calls[0][0];

            expect(res.status).toBeCalled();
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalled();
            expect(res.send).toBeCalledWith(users)
        })
    })
})