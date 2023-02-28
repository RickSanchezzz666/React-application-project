const { Schema, model } = require('mongoose');

const schema = new Schema({
    user_id: { type: Number },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: [String], default: ['user'] },
    contact_information: { 
        email: { type: String },
        phone: { type: String },
        name: { type: String },
        surname: { type: String }
    },
    location: { 
        address: { type: String },
        city: { type: String },
        country: { type: String },
        zipcode: { type: String }
    },
    patient_info: { 
        overall: { type: String },
        blood_type: { type: String }
    }
});

const Users = new model('users', schema)

module.exports = { Users };