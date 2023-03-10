const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, default: '' },
    surname: { type: String, default: '' }
});

const Docs = new model('docs', schema)

module.exports = { Docs };