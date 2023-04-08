const { Schema, model } = require('mongoose');

const schema = new Schema({
    user_info: { 
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        name: { type: String, required: true, default: '' },
        surname: { type: String, required: true, default: '' },
        login: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profile_pic: { type: String, default: 'https://i.ibb.co/HFbBrvn/Icon-profile.png' },
        access_level: { type: Number, default: '20' },
        createdBy: { type: String, default: 'SuperUser_console' },
        creationTime: { type: Date, default: '' },
        birthday: { type: String, default: '' }
    },
    location_info: { 
        address: { type: String, default: '' },
        city: { type: String, default: '' },
        country: { type: String, default: '' },
        zipcode: { type: String, default: '' }
    },
    patient_info: { 
        overall: { type: String, default: '' },
        blood_type: { type: String, default: '' }
    }
});

const Users = new model('users', schema, 'users');

module.exports = { Users };