const { Schema, model } = require('mongoose');

const schema = new Schema({
    contact_information: { 
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        name: { type: String, required: true, default: '' },
        surname: { type: String, required: true, default: '' }
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
    },
});

const Clients = new model('clients', schema)

module.exports = { Clients };