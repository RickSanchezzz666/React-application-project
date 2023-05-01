const { Router } = require('express');

const { RoomsHandler } = require('./handlers')
const passport = require('passport');

const { wrapperApi } = require('./wrapperApi')

const router = Router();

router.post("/api/create-new-room",
  passport.authenticate('jwt', { session: false }),
  wrapperApi(RoomsHandler.createRoom)
);

router.get("/api/show-available-rooms",
  passport.authenticate('jwt', { session: false }),
  wrapperApi(RoomsHandler.showAvailableRooms)
);

router.post("/api/delete-room",
  passport.authenticate('jwt', { session: false }),
  wrapperApi(RoomsHandler.deleteRoom)
);

router.get("/api/room-verify", wrapperApi(RoomsHandler.roomVerify));

router.get("/api/room-pass-verify", wrapperApi(RoomsHandler.roomPassVerify));

module.exports = { router };