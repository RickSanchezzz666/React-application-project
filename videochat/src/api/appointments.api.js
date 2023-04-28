const { Router } = require('express');
const { AppointmentsModel } = require('../models/appointments');
const passport = require('passport');

const router = Router();

router.post("/api/create-new-appointment", passport.authenticate('jwt', { session: false }), async (req, res) => {
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
});

router.get("/api/get-appointments", passport.authenticate('jwt', { session: false }), async (req, res) => {
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
      const appointments = await AppointmentsModel.find().sort({ appointmentTime: 1 });
      return res.status(200).send(appointments);
    } catch (err) {
      res.status(400).send();
    };
  }
});

router.get('/api/get-user-appointments', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_info.access_level === 25 || req.user.user_info.access_level === 30) {
    try {
      const { forUserId } = req.query;

      const dbQuery = {};

      if (forUserId) {
        dbQuery.forUserId = forUserId;
      }
      const userAppointments = await AppointmentsModel.find({ dbQuery });
      return res.status(200).send(userAppointments);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    return res.status(403).send('Your access level is not enough');
  };
})

router.put('/api/appointment-update', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
});

module.exports = { router };