const { Router } = require('express');
const { RoomsModel } = require('../models/rooms');
const passport = require('passport');

const router = Router();

router.post("/api/create-new-room", passport.authenticate('jwt', {session: false}), async (req, res) => {
  if (req.user.user_info.access_level === 25 || req.user.user_info.access_level === 30 ) {
    const { roomId, password, startTime, createdBy } = req.body;
    const meeting = new RoomsModel({ roomId, password, startTime, createdBy });
    try {
      await meeting.save();
      return res.status(200).send({roomId});
    } catch (err) {
      res.status(400).send();
    };
  } else {
      return res.status(403).send('Your access level is not enough');
  };
});

router.get("/api/room-verify", async (req, res) => {
 try {
  const { roomId } = req.query;
  if (!roomId) {
   return res.status(400).send({message: 'Parameter username is required'});
  }

  const room_ident = await RoomsModel.findOne({ roomId });

  if (!room_ident) {
   return res.status(400).send();
  }
  res.status(200).send();
 } catch (error) {
  console.error(error);
  res.status(500).send();
 }
});

router.get("/api/room-pass-verify", async (req, res) => {
 try {
  const { roomId, password } = req.query;
  if (!roomId) {
   return res.status(400).send({message: 'Parameter username is required'});
  }

  if (!password) {
    return res.status(400).send({message: 'Parameter password is required'});
  }

  const room_ident = await RoomsModel.findOne({ roomId });

  if (!room_ident) {
    return res.status(400).send({message: 'We not found any room with such room id'});
  };
  if (room_ident.password !== password) {
    return res.status(401).send({message: 'Password is incorrect'});
  };
  res.status(200).send();
 } catch (error) {
  console.error(error);
  res.status(500).send();
 }
});

module.exports = { router };