const { Router } = require('express');
const { AppointmentsModel } = require('../models/appointments');
const passport = require('passport');

const router = Router();

router.post("/api/create-new-appointment", passport.authenticate('jwt', {session: false}), async (req, res) => {
  if (req.user.user_info.access_level === 25 || req.user.user_info.access_level === 30 ) {
    const { createdBy, forUser, appointmentTime } = req.body;
    const appointment = new AppointmentsModel({ createdBy, forUser, appointmentTime });
    try {
      await appointment.save();
      return res.status(200).send();
    } catch (err) {
      res.status(400).send();
    };
  } else {
      return res.status(403).send('Your access level is not enough');
  };
});

router.get("/api/show-user-appointments", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
      const appointments = await AppointmentsModel.find({ forUser: req.user._id });
      return res.status(200).send(appointments);
    } catch (err) {
      res.status(400).send();
    };
});

module.exports = { router };