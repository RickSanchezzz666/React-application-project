const { AppointmentsModel } = require('../../../models/appointments');

module.exports.createAppointment = async (req, res) => {
    if (req.user.user_info.access_level === 25 || req.user.user_info.access_level === 30) {
        const { createdBy, forUserId, forUserName, appointmentTime } = req.body;
        const appointment = new AppointmentsModel({ createdBy, forUserId, forUserName, appointmentTime });
        try {
            await appointment.save();
            return res.status(200).send();
        } catch (err) {
            res.status(400).send();
        };
    } else {
        return res.status(403).send('Your access level is not enough');
    };
};