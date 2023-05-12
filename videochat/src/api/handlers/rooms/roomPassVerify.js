const { RoomsModel } = require('../../../models/rooms');

module.exports.roomPassVerify = async (req, res) => {
    try {
        const { roomId, password } = req.query;
        if (!roomId) {
            return res.status(400).send({ message: 'Parameter roomId is required' });
        }

        if (!password) {
            return res.status(400).send({ message: 'Parameter password is required' });
        }

        const room_ident = await RoomsModel.findOne({ roomId });

        if (!room_ident) {
            return res.status(400).send({ message: 'We not found any room with such room id' });
        };
        if (room_ident.password !== password) {
            return res.status(401).send();
        };
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}