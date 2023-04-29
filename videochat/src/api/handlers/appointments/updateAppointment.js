const { AppointmentsModel } = require('../../../models/appointments');

module.exports.updateAppointment = async (req, res) => {
    if (req.user.user_info.access_level === 25 || req.user.user_info.access_level === 30) {
        const { id, roomId, roomPass } = req.body;

        try {
            const updatedObject = await AppointmentsModel.findByIdAndUpdate(id, { roomId, roomPass });

            if (!updatedObject) {
                return res.status(404).send('Object not found');
            }

            return res.status(200).send();
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }
    } else {
        return res.status(403).send('Your access level is not enough');
    };
};