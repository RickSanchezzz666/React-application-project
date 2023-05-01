const { Router } = require('express');

const { AppointmentHandler } = require('./handlers')
const passport = require('passport');

const { wrapperApi } = require('./wrapperApi')

const router = Router();

router.post("/api/create-new-appointment",
  passport.authenticate('jwt', { session: false }),
  wrapperApi(AppointmentHandler.createAppointment)
);

router.post('/api/delete-appointment',
  passport.authenticate('jwt', { session: false }),
  wrapperApi(AppointmentHandler.deleteAppointment)
)

router.get("/api/get-appointments",
  passport.authenticate('jwt', { session: false }),
  wrapperApi(AppointmentHandler.getAppointment)
);

router.put('/api/appointment-update',
  passport.authenticate('jwt', { session: false }),
  wrapperApi(AppointmentHandler.updateAppointment)
);

module.exports = { router };