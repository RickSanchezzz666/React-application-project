const { AppointmentsModel } = require('../../../models/appointments');

module.exports.getAppointment = async (req, res) => {
    if (req.user.user_info.access_level === 20) {
        try {
            const appointments = await AppointmentsModel.find({ forUserId: req.user._id }).sort({ appointmentTime: 1 });
            return res.status(200).send(appointments);
        } catch (err) {
            res.status(400).send();
        };
    }
    if (req.user.user_info.access_level === 25 || req.user.user_info.access_level === 30) {
        try {
            const { forUserId } = req.query;

            const dbQuery = {};

            if (forUserId) {
                dbQuery.forUserId = forUserId;
            }
            const appointments = await AppointmentsModel.find(dbQuery).sort({ appointmentTime: 1 });
            return res.status(200).send(appointments);
        } catch (err) {
            res.status(400).send();
        };
    }
};