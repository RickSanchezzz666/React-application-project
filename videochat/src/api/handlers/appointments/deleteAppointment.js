const { AppointmentsModel } = require('../../../models/appointments');

module.exports.deleteAppointment = async (req, res) => {
    if (req.user.user_info.access_level === 25 || req.user.user_info.access_level === 30) {
        const { _id } = req.body;
        try {
            if (!_id) {
                return res.status(400).send({ message: 'AppointmentId is required!' })
            }
            const appointment = await AppointmentsModel.findOneAndDelete({ _id })

            if(!appointment) {
                return res.status(404).send({ message: 'We dont find such appointment!' })
            }

            return res.status(200).send();
        } catch (error) {
            res.status(400).send();
        }
    } else {
        return res.status(403).send('Your access level is not enough');
    };
}