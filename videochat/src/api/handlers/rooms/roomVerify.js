const { RoomsModel } = require('../../../models/rooms');

module.exports.roomVerify = async (req, res) => {
    try {
        const { roomId } = req.query;
        if (!roomId) {
            return res.status(400).send({ message: 'Parameter username is required' });
        }

        const room_ident = await RoomsModel.findOne({ roomId });

        if (!room_ident) {
            return res.status(400).send();
        }
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}