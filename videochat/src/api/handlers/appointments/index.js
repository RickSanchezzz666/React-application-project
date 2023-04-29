module.exports.AppointmentHandler = {
    ...require('./createAppointment'),
    ...require('./deleteAppointment'),
    ...require('./getAppointments'),
    ...require('./updateAppointment')
}