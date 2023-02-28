const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: [String], default: ['user'] },
    contact_information: { 
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        name: { type: String, default: '' },
        surname: { type: String, default: '' }
    },
    location: { 
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

const Users = new model('users', schema)

module.exports = { Users };