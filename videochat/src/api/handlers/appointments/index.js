module.exports.AppointmentHandler = {
    ...require('./createAppointment'),
    ...require('./getAppointments'),
    ...require('./updateAppointment')
}