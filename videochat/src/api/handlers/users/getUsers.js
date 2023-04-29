const { Users } = require('../../../models/rooms');

module.exports.getUsers = async (req, res) => {
    if (req.user.user_info.access_level === 30) {
        const dbQuery = {};
        const { email, phone, name, surname, gender, access_level, createdBy, creationTime, birthday, address, city, country, zipcode, blood_type } = req.query;
        if (email) {
            dbQuery["user_info.email"] = { $regex: email, $options: 'i' };
        }
        if (phone) {
            dbQuery["user_info.phone"] = { $regex: phone };
        }
        if (name) {
            dbQuery["user_info.name"] = { $regex: name, $options: 'i' };
        }
        if (surname) {
            dbQuery["user_info.surname"] = { $regex: surname, $options: 'i' };
        }
        if (gender) {
            dbQuery["user_info.gender"] = gender;
        }
        if (access_level) {
            dbQuery["user_info.access_level"] = access_level;
        }
        if (createdBy) {
            dbQuery["user_info.createdBy"] = createdBy;
        }
        if (creationTime) {
            dbQuery["user_info.creationTime"] = creationTime;
        }
        if (birthday) {
            dbQuery["user_info.birthday"] = birthday;
        }
        if (address) {
            dbQuery["location_info.address"] = { $regex: address, $options: 'i' };
        }
        if (city) {
            dbQuery["location_info.city"] = { $regex: city, $options: 'i' };
        }
        if (country) {
            dbQuery["location_info.country"] = { $regex: country, $options: 'i' };
        }
        if (zipcode) {
            dbQuery["location_info.zipcode"] = zipcode;
        }
        if (blood_type) {
            dbQuery["patient_info.blood_type"] = blood_type;
        }
        const users = await Users.find(dbQuery);
        return res.status(200).send(users);
    };
    if (req.user.user_info.access_level === 25) {
        const dbQuery = {};
        const { email, phone, name, surname, gender, createdBy, creationTime, birthday, address, city, country, zipcode, blood_type } = req.query;
        if (email) {
            dbQuery["user_info.email"] = { $regex: email, $options: 'i' };
        }
        if (phone) {
            dbQuery["user_info.phone"] = { $regex: phone };
        }
        if (name) {
            dbQuery["user_info.name"] = { $regex: name, $options: 'i' };
        }
        if (surname) {
            dbQuery["user_info.surname"] = { $regex: surname, $options: 'i' };
        }
        if (gender) {
            dbQuery["user_info.gender"] = gender;
        }
        if (createdBy) {
            dbQuery["user_info.createdBy"] = createdBy;
        }
        if (creationTime) {
            dbQuery["user_info.creationTime"] = creationTime;
        }
        if (birthday) {
            dbQuery["user_info.birthday"] = birthday;
        }
        if (address) {
            dbQuery["location_info.address"] = { $regex: address, $options: 'i' };
        }
        if (city) {
            dbQuery["location_info.city"] = { $regex: city, $options: 'i' };
        }
        if (country) {
            dbQuery["location_info.country"] = { $regex: country, $options: 'i' };
        }
        if (zipcode) {
            dbQuery["location_info.zipcode"] = zipcode;
        }
        if (blood_type) {
            dbQuery["patient_info.blood_type"] = blood_type;
        }
        dbQuery["user_info.access_level"] = 20;
        const users = await Users.find(dbQuery);
        return res.status(200).send(users);
    } else {
        return res.status(403).send('Your access level is not enough');
    };
}