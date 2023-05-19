/**
 * Користувач має залогінитись та увійти у свій кабінет
 */

const request = require('supertest')
// require('dotenv'.config({ path: '../../.env.test'}))
const setupResult = require('../../server')
const { Users } = require('../../src/models/users')

console.log(process.env.MONGO_DB_AUTH)
describe('scenario 1', () => {
    let app;
    beforeAll(async () => {
        app = await setupResult;

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
            },
            {
                user_info: {
                    email: 'testmail@gmail.com',
                    phone: '+380000000000',
                    name: 'Roman',
                    surname: 'Romanovichov',
                    login: 'userok',
                    password: '123',
                    profile_pic: 'https://i.ibb.co/HFbBrvn/Icon-profile.png',
                    access_level: 20,
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

    })

    const login = '123';
    const password = '123'
    it('test 1', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ user_info: { login: login, password: password } })

        console.log(response)
        
        expect(response.statusCode).toBe(200);
    })
})