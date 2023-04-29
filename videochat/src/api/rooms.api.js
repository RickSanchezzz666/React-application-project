const { Router } = require('express');

const { rooms } = require('./handlers')
const passport = require('passport');

const { wrapperApi } = require('../wrapperApi')

const router = Router();

router.post("/api/create-new-room",
  passport.authenticate('jwt', { session: false }),
  wrapperApi(rooms.createRoom)
);

router.get("/api/show-available-rooms",
  passport.authenticate('jwt', { session: false }),
  wrapperApi(rooms.showAvailableRooms)
);

router.post("/api/delete-room",
  passport.authenticate('jwt', { session: false }),
  wrapperApi(rooms.deleteRoom)
);

router.get("/api/room-verify", wrapperApi(rooms.roomVerify));

router.get("/api/room-pass-verify", wrapperApi(rooms.roomPassVerify));

module.exports = { router };