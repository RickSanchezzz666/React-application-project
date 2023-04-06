const { Router } = require('express');
const { RoomsModel } = require('../models/rooms');
const passport = require('passport');

const router = Router();

router.post("/api/create-room", passport.authenticate('jwt', {session: false}), async (req, res) => {
  const { roomId, password, startTime, createdBy } = req.body;

  const meeting = new RoomsModel({ roomId, password, startTime, createdBy });
  try {
    await meeting.save();
    return res.status(200).send({roomId});
  } catch (err) {
    res.status(400).send();
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

router.get('/api/password-verify', async (req, res) => {
  try {
    const { roomId, password } = req.query;
  if (!roomId) {
   return res.status(400).send({message: 'Parameter roomId is required'});
  }
  if (!password) {
    return res.status(400).send({message: 'Parameter password is required'});
   }

  const room_ident = await RoomsModel.findOne({ roomId });

  const password_ident = await RoomsModel.findOne({ password });

  if (!room_ident) {
    return res.status(400).send();
  }
  if (!password_ident) {
    return res.status(400).send();
  }
  res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});



module.exports = { router };