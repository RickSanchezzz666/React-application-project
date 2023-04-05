const { Router } = require('express');
const { RoomsModel } = require('../models/rooms');

const router = Router();

router.post("/api/create-room", async (req, res) => {
 try {
  const { roomId } = req.body;
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

module.exports = { router };