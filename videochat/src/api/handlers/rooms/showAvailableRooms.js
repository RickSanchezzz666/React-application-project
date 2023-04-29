const { RoomsModel } = require('../../../models/rooms');

module.exports.showAvailableRooms = async (req, res) => {
    if (req.user.user_info.access_level === 30) {
        try {
            const meetings = await RoomsModel.find();
            return res.status(200).send(meetings);
        } catch (err) {
            res.status(400).send();
        };
    } else {
        return res.status(403).send('Your access level is not enough');
    };
}