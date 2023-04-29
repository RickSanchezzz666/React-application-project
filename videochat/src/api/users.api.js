const { Router } = require('express');

const { UsersHandler } = require('./handlers')
const passport = require('passport');

const { wrapperApi } = require('../wrapperApi')

const router = Router();

router.post("/api/login", wrapperApi(UsersHandler.login));

router.get("/api/users",
    passport.authenticate('jwt', { session: false }),
    wrapperApi(UsersHandler.getUsers)
);

router.get("/api/gatekeeper",
    passport.authenticate('jwt', { session: false }),
    wrapperApi(UsersHandler.gatekeeper)
);

router.post("/api/create-new-user",
    passport.authenticate('jwt', { session: false }),
    wrapperApi(UsersHandler.createNewUser)
);

module.exports = { router };