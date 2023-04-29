const { RoomsModel } = require('../../../models/rooms');

module.exports.createRoom = async (req, res) => {
    if (req.user.user_info.access_level === 25 || req.user.user_info.access_level === 30) {
        const { roomId, password, startTime, createdBy } = req.body;
        const meeting = new RoomsModel({ roomId, password, startTime, createdBy });
        try {
            await meeting.save();
            return res.status(200).send({ roomId });
        } catch (err) {
            res.status(400).send();
        };
    } else {
        return res.status(403).send('Your access level is not enough');
    };
}