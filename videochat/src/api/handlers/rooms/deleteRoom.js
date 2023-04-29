const { RoomsModel } = require('../../../models/rooms');

module.exports.deleteRoom = async (req, res) => {
    if (req.user.user_info.access_level === 30) {
        const { roomId } = req.body;
        try {
            if (!roomId) {
                return res.status(400).send({ message: 'RoomId and RoomPassword is required!' })
            }
            const room = await RoomsModel.findOneAndDelete({ roomId });

            if (!room) {
                return res.status(404).send({ message: 'We not found any room' })
            }

            return res.status(200).send();
        } catch (err) {
            res.status(400).send();
        };
    } else {
        return res.status(403).send('Your access level is not enough');
    };
}