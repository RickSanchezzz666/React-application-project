const { Users } = require('../../../models/rooms');

module.exports.gatekeeper = async (req, res) => {
    const { user_info: { name, surname, profile_pic, access_level } } = req.user;
    return res.status(200).json({ name, surname, profile_pic, access_level });
}