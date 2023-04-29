const { Router } = require('express');

const { appointments } = require('./handlers')
const passport = require('passport');

const { wrapperApi } = require('../wrapperApi')

const router = Router();

router.post("/api/create-new-appointment",
  passport.authenticate('jwt', { session: false }),
  wrapperApi(appointments.createAppointment)
);

router.get("/api/get-appointments",
  passport.authenticate('jwt', { session: false }),
  wrapperApi(appointments.getAppointments)
);

router.put('/api/appointment-update',
  passport.authenticate('jwt', { session: false }),
  wrapperApi(appointments.updateAppointment)
);

module.exports = { router };