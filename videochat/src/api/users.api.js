const { Router } = require('express');

const { users } = require('./handlers')
const passport = require('passport');

const { wrapperApi } = require('../wrapperApi')

const router = Router();

router.post("/api/login", wrapperApi(users.login));

router.get("/api/users",
    passport.authenticate('jwt', { session: false }),
    wrapperApi(users.getUsers)
);

router.get("/api/gatekeeper",
    passport.authenticate('jwt', { session: false }),
    wrapperApi(users.gatekeeper)
);

router.post("/api/create-new-user",
    passport.authenticate('jwt', { session: false }),
    wrapperApi(users.createNewUser)
);

module.exports = { router };