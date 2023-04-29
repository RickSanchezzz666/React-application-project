const { Users } = require('../../../models/rooms');

module.exports.createNewUser = async (req, res) => {
    if (req.user.user_info.access_level === 30) {
        try {
            const { user_info: { email, phone, name, surname, login, password, profile_pic, access_level, createdBy, creationTime, birthday, gender }, location_info: { address, city, country, zipcode }, patient_info: { overall, blood_type } } = req.body;
            const newUser = new Users({ user_info: { email, phone, name, surname, login, password, profile_pic, access_level, createdBy, creationTime, birthday, gender }, location_info: { address, city, country, zipcode }, patient_info: { overall, blood_type } });
            await newUser.save();
            return res.status(200).send();
        } catch (err) {
            res.status(500).send({ message: 'Internal server error' });
        };
    } if (req.user.user_info.access_level === 25) {
        try {
            const { user_info: { email, phone, name, surname, login, password, profile_pic, createdBy, creationTime, birthday, gender }, location_info: { address, city, country, zipcode }, patient_info: { overall, blood_type } } = req.body;
            const newUser = new Users({ user_info: { email, phone, name, surname, login, password, profile_pic, createdBy, creationTime, birthday, gender }, location_info: { address, city, country, zipcode }, patient_info: { overall, blood_type } });
            await newUser.save();
            return res.status(200).send();
        } catch (err) {
            res.status(500).send({ message: 'Internal server error' });
        };
    } else {
        return res.status(403).send('Your access level is not enough');
    };
}